import { getCurrentInstance } from '@vue/composition-api';

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root;
};

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { query, params } = instance.$router.history.current;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      term: query.term
    };
  };

  const getSearchTermFromUrl = () => {
    const { query, params } = instance.$router.history.current;
    // hardcoded categorySlug for search results
    const categorySlug = 'women-clothing-jackets';

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      term: query.term
    };
  };

  const getCatLink = (category) => {
    return `/c/${instance.$route.params.slug_1}/${category.slug}`;
  };

  const changeSorting = (sort) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        itemsPerPage
      }
    });
  };

  const setTermForUrl = (term) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        term: term || undefined
      }
    });
  };

  const isFacetColor = (facet) => facet.id === 'color';

  const isFacetCheckbox = () => false;

  const getImageURL = (product, imagetype) => {
    let image = "";
    for (let i = 0; i < product['images']?.length; i++) {
      if (product['images'][i]['label'] === imagetype) {
        image = product['images'][i]['url'] || 'https://avon.europe-west1.gcp.storefrontcloud.io/placeholder.png';
        return image;
      }
    }
    return ''
  }

  const getVariant = (product, variantType) => {
    var variant = product['attributesRaw']?.find((obj) => {
      return obj.name === variantType;
    });
    return variant ? variant : "";
  }

  const mapChildren = (parents, categories, result) => parents.map((p) => ({
    label: p.name,
    slug: p.slug,
    isCurrent: p.id === result.data._currentCat.id,
    count: p.count,
    items: mapChildren(
      categories.filter((c) => c.parent && c.parent.id === p.id),
      categories,
      result
    )
  }));

  const getDetailPrice = (price) => {
    return price ? price.centAmount / 100 : null;
  };

  const getPrice = (price) => {
    return price ? price.value.centAmount / 100 : null;
  };

  const getDiscount = (product) => product.price?.discounted;

  const getSpecialPrice = (product) => {
    const discount = getDiscount(product);

    if (isLineItem(product)) {
      const { discountedPricePerQuantity } = product;
      const discountsLength = discountedPricePerQuantity.length;

      if (discountsLength > 0) {
        return getPrice(discountedPricePerQuantity[discountsLength - 1].discountedPrice);
      }
    }

    if (discount?.discount) {
      return getPrice(discount);
    }

    return null;
  };

  const getProductSpecialPrice = (product) => {
    const discount = getDiscount(product);
    const quantity = isLineItem(product) ? product.quantity : 1;
    if (isLineItem(product)) {
      const { discountedPricePerQuantity } = product;
      const discountsLength = discountedPricePerQuantity.length;

      if (discountsLength > 0) {
        let discountPrice=0;
        discountedPricePerQuantity.map(item=>{
          discountPrice=discountPrice+ (getPrice(item.discountedPrice)*item.quantity);
        })
        return discountPrice;
      }
    }

    if (discount?.discount) {
      return getPrice(discount)*quantity;
    }

    return null;
  };

  const getCartItems = (cart) => {
    if (!cart) {
      return [];
    }

    return cart.lineItems;
  };

  const getCartSubtotalPrice = (cart, selectSpecialPrices) => {
    return getCartItems(cart).reduce((total, cartItem) => {
      const quantity = isLineItem(cartItem) ? cartItem.quantity : 1;
      const regular = getPrice(cartItem.price) * quantity;
      const special=getProductSpecialPrice(cartItem);
      const itemPrice = (selectSpecialPrices && special) || regular;

      return total + itemPrice;
    }, 0);
  };

  const isLineItem = (product) => {
    return product.__typename === 'LineItem';
  }


  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    getImageURL,
    getVariant,
    getCategoryTreeNew,
    getSpecialPrice,
    getPrice,
    getDetailPrice,
    getProductSpecialPrice,
    getCartSubtotalPrice
  };
};

export default useUiHelpers;

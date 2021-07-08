<template>
  <div id="cart" class="cart_page">
    <SfHeading
            :level="3"
            :title="`Your Shopping Bag`"
            class="cart_title"
    />
    <div class="smartphone-only continue_shopping">
      <router-link
        data-cy="app-header-url_logo"
        to="/"
        class="sf-header__logo"
      >
        <SfLink class="sf-product-card__link navTitle">
          Continue Shopping
          <SfIcon
            icon="chevron_left"
            class="navIcon"
            color=" var(--c-primary)"
            size="sm"
          />
        </SfLink>
      </router-link>
    </div>
    <div v-if="cartDiscounts && cartDiscounts.length > 0" class="offer_cart">
      <SfHeading
        :level="5"
        title="You have fulfilled the conditions of these special offers!"
        class="offer_title"
      />
      <div v-for="(item, i) in cartDiscounts" :key="i">
        <SfHeading
          :level="6"
          v-if="
            (coupons && coupons[0] && coupons[0].code !== item.name) ||
            (!coupons[0] && promoCode !== item.name)
          "
          :title="item.name"
          class="offer_name"
        />
      </div>
    </div>
    <div class="cart_header" v-if="totalItems">
      <SfHeading
        :level="3"
        :title="`Your Shopping Bag (${totalItems})`"
        class="cart_title"
      />
      <router-link
        data-cy="app-header-url_logo"
        to="/"
        class="sf-header__logo desktop-only"
      >
        <SfLink class="sf-product-card__link navLink_top">
          {{ "Continue Shopping arrow" }}
        </SfLink>
      </router-link>
      <div class="actions_top desktop-only">
        <router-link to="/checkout/shipping">
          <SfButton class="sf-add-to-cart__button cart_checkout_actions">
            {{ "Go to checkout" }}
          </SfButton>
        </router-link>
      </div>
    </div>
    <div class="my-cart">
      <div class="cart_headers desktop-only">
        <SfHeading :level="6" title="ITEMS" />
        <SfHeading :level="6" title="" />
        <SfHeading :level="6" title="ITEM PRICE" class="cart_header_price" />
        <SfHeading :level="6" title="QUANTITY" />
        <SfHeading :level="6" title="SUBTOTAL" />
      </div>
      <div v-for="(product, i) in products" :key="i">
        <CartProduct
          image="https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5478375_1_613x613.jpg"
          title="Hello world!"
          :regularprice="10"
          :stock="99999"
          :qty="1"
          :variant="getVariant(product)"
          :product="product.variant"
          :class="getVariant(product) ? 'variantItem' : 'novariantItem'"
        />
      </div>
    </div>

    <div class="highlighted promo-code" v-if="totalItems">
      <SfInput
        v-if="!coupons[0]"
        data-cy="cart-preview-input_promoCode"
        v-model="promoCode"
        name="promoCode"
        label="Enter promo code"
        class="sf-input--filled voucher_input"
      />
      <SfButton
        v-if="!coupons[0]"
        class="promo-code__button"
        >Apply</SfButton
      >
      <div v-if="coupons[0]" class="promo-code-remove__button">
        <p class="promo-code-display">
          Applied Coupon:
          <span class="promo-code-text">{{ coupons[0].code }}</span>
        </p>
        <SfButton> x </SfButton>
      </div>
    </div>
    <div class="cart_bottom" v-if="totalItems">
      <SfLink
        class="sf-product-card__link cart_navlink smartphone-only"
        link="/"
      >
        Continue Shopping
      </SfLink>
      <div class="cart_subtotal">
        <SfHeading
          :level="5"
          title="SUBTOTAL:"
          class="cart_subtotal-title"
        />
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="$n(getSubtotal(false), 'currency')"
          :special="
            getSubtotal(true) < getSubtotal(false)
              ? $n(getSubtotal(true), 'currency')
              : null
          "
        />
      </div>
    </div>
    <div class="cart_actions" v-if="totalItems">
      <SfLink
        class="sf-product-card__link desktop-only continue_link"
        link="/"
      >
        Continue Shopping
      </SfLink>
      <router-link to="/checkout/shipping">
        <SfButton class="sf-add-to-cart__button cart_checkout_actions">
          Go to checkout
        </SfButton>
      </router-link>
    </div>
    <div class="cart_payment_options" v-if="totalItems">
      <SfHeading :level="3" title="We accept" class="payment_title" />
      <div class="payment_options">
        <SfImage
          src="/cart/maestro.png"
          alt="mastero"
          :width="50"
          :height="30"
        />
        <SfImage
          src="/cart/mastercard.png"
          alt="master"
          :width="50"
          :height="30"
        />
        <SfImage src="/cart/visa.png" alt="visa" :width="50" :height="30" />
        <SfImage src="/cart/gpay.png" alt="visa" :width="50" :height="37" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfArrow,
  SfBadge,
  SfBreadcrumbs,
  SfBullets,
  SfButton,
  SfChevron,
  SfCimage,
  SfCircleIcon,
  SfColor,
  SfDivider,
  SfHeading,
  SfIcon,
  SfImage,
  SfInput,
  SfLink,
  SfLoader,
  SfOverlay,
  SfPrice,
  SfProperty,
  SfQuantitySelector,
  SfRating,
  SfTextarea,
  SfAddressPicker,
  SfAddToCart,
  SfAlert,
  SfBanner,
  SfBar,
  SfBottomModal,
  SfCallToAction,
  SfCard,
  SfCategoryCard,
  SfCharacteristic,
  SfCheckbox,
  SfColorPicker,
  SfComponentSelect,
  SfDropdown,
  SfFilter,
  SfGallery,
  SfMenuItem,
  SfModal,
  SfNotification,
  SfPagination,
  SfProductOption,
  SfRadio,
  SfReview,
  SfScrollable,
  SfSearchBar,
  SfSection,
  SfSelect,
  SfSlidingSection,
  SfSteps,
  SfSticky,
  SfTile,
  SfAccordion,
  SfBannerGrid,
  SfBottomNavigation,
  SfCarousel,
  SfCollectedProduct,
  SfContentPages,
  SfFooter,
  SfGroupedProduct,
  SfHeader,
  SfHero,
  SfList,
  SfMegaMenu,
  SfProductCard,
  SfProductCardHorizontal,
  SfSidebar,
  SfStoreLocator,
  SfTable,
  SfTabs,
  SfTopBar
} from "@storefront-ui/vue";

import CartProduct from "./CartProduct.vue";
import { computed, ref } from "@vue/composition-api";

import useUiHelpers from "../composables/useUiHelpers";

export default {
  name: "Cart",
  props: ["main"],
  components: {
    SfArrow,
    SfBadge,
    SfBreadcrumbs,
    SfBullets,
    SfButton,
    SfChevron,
    SfCimage,
    SfCircleIcon,
    SfColor,
    SfDivider,
    SfHeading,
    SfIcon,
    SfImage,
    SfInput,
    SfLink,
    SfLoader,
    SfOverlay,
    SfPrice,
    SfProperty,
    SfQuantitySelector,
    SfRating,
    SfTextarea,
    SfAddressPicker,
    SfAddToCart,
    SfAlert,
    SfBanner,
    SfBar,
    SfBottomModal,
    SfCallToAction,
    SfCard,
    SfCategoryCard,
    SfCharacteristic,
    SfCheckbox,
    SfColorPicker,
    SfComponentSelect,
    SfDropdown,
    SfFilter,
    SfGallery,
    SfMenuItem,
    SfModal,
    SfNotification,
    SfPagination,
    SfProductOption,
    SfRadio,
    SfReview,
    SfScrollable,
    SfSearchBar,
    SfSection,
    SfSelect,
    SfSlidingSection,
    SfSteps,
    SfSticky,
    SfTile,
    SfAccordion,
    SfBannerGrid,
    SfBottomNavigation,
    SfCarousel,
    SfCollectedProduct,
    SfContentPages,
    SfFooter,
    SfGroupedProduct,
    SfHeader,
    SfHero,
    SfList,
    SfMegaMenu,
    SfProductCard,
    SfProductCardHorizontal,
    SfSidebar,
    SfStoreLocator,
    SfTable,
    SfTabs,
    SfTopBar,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    SfLink,
    SfIcon,
    SfPrice,
    CartProduct,
    SfInput,
    SfProperty,
    SfTable,
    SfAlert,
  },
  setup() {
    const th = useUiHelpers();


    const promoCode = ref("");
    const quantity = ref(1);
    const totalItems = ref(1);
    const remCoupon = (couponObj) => {
      promoCode.value = "";
      removeCoupon({
        coupon: { id: couponObj && couponObj[0] && couponObj[0].id },
      });
    };

    const updateQuantity = (product, quantity) => {
      updateItemQty({ product, quantity: parseInt(quantity) });
    };

    const getSubtotal = (type) => {
      return th.getCartSubtotalPrice(cart.value, type);
    };


    const getVariant = (product) => {
      var variant = th.getVariant(product.variant, "variantType");
      return variant ? variant.value : "";
    };

    const products = ref([
            {
        "isMatchingVariant": true,
        "attributes": [{"name": "brandId", "value": "734"}, {
          "name": "startDate",
          "value": "2020-05-01T00:00:00.000Z"
        }, {"name": "endDate", "value": "2021-04-30T00:00:00.000Z"}, {
          "name": "brandName",
          "value": "Hidden Home"
        }, {"name": "finishedStockCode", "value": "1335269"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5478375_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5478375_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "57d22c68-c7af-4637-a1e9-65183e85621e"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 800, "fractionDigits": 2},
          "id": "103924dd-d527-4f1f-9aac-b1d15f8aa466",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "57d22c68-c7af-4637-a1e9-65183e85621e"
        }],
        "key": "13539-212398418933",
        "sku": "13539-212398418933",
        "id": 1,
        "_id": "920a8626-6585-4c0f-8828-f683368b5991",
        "_name": "Jumbo Under-Bed Storage - Red Star Print",
        "_slug": "product_13539_jumbo-under-bed-storage-red-star-print"
      }, {
        "isMatchingVariant": true,
        "attributes": [{
          "name": "variantType",
          "value": {"key": "Version", "label": "Version"}
        }, {"name": "variantValue", "value": "Black"}, {
          "name": "startDate",
          "value": "2020-05-01T00:00:00.000Z"
        }, {"name": "endDate", "value": "2021-04-30T00:00:00.000Z"}, {"name": "finishedStockCode", "value": "1372334"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5516186_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5516186_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 3300, "fractionDigits": 2},
          "id": "ec4478fd-f1b4-41a6-a910-9b6586b25357"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 3000, "fractionDigits": 2},
          "id": "5879a944-16d4-41b8-ae2d-15273322ab15",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 3300, "fractionDigits": 2},
          "id": "ec4478fd-f1b4-41a6-a910-9b6586b25357"
        }],
        "key": "13878-212398420351",
        "sku": "13878-212398420351",
        "id": 1,
        "_id": "38035009-a714-4aa2-a360-e8656226772d",
        "_name": "Niko Smart Watch",
        "_slug": "product_13878_niko-smart-watch"
      }, {
        "isMatchingVariant": true,
        "attributes": [{
          "name": "variantType",
          "value": {"key": "Version", "label": "Version"}
        }, {"name": "variantValue", "value": "Leaf print grey"}, {
          "name": "brandId",
          "value": "734"
        }, {"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "brandName", "value": "Hidden Home"}, {"name": "finishedStockCode", "value": "1329756"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5474720_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5474720_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "4b112018-aecf-401c-a41d-e558d1f3f08d"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 800, "fractionDigits": 2},
          "id": "4e6a2549-1570-4070-a94b-cd5117769830",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "4b112018-aecf-401c-a41d-e558d1f3f08d"
        }],
        "key": "13445-212398421406",
        "sku": "13445-212398421406",
        "id": 1,
        "_id": "a002273b-adb9-4e37-91ef-34c7ab178d25",
        "_name": "Jumbo Under-Bed Storage - Grey Leaf Print",
        "_slug": "product_13445_jumbo-under-bed-storage-grey-leaf-print"
      }, {
        "isMatchingVariant": true,
        "attributes": [{
          "name": "variantType",
          "value": {"key": "Version", "label": "Version"}
        }, {"name": "variantValue", "value": "Star print red"}, {
          "name": "brandId",
          "value": "734"
        }, {"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "brandName", "value": "Hidden Home"}, {"name": "finishedStockCode", "value": "1335267"}],
        "availability": {
          "isOnStock": false,
          "availableQuantity": 0,
          "channels": {"8e0ac013-be7a-4fb9-8f0d-b98483740a33": {"isOnStock": false, "availableQuantity": 0}}
        },
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5478359_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5478359_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "689e33fe-ee2a-47cb-a0c4-e0c8b91cc135"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 600, "fractionDigits": 2},
          "id": "8945ae78-7d7c-443e-a270-6425f4d51baf",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "689e33fe-ee2a-47cb-a0c4-e0c8b91cc135"
        }],
        "key": "13448-212398418929",
        "sku": "13448-212398418929",
        "id": 1,
        "_id": "d4fff111-7716-4344-a295-5ab267c5bcf1",
        "_name": "Red Star Cube Storage",
        "_slug": "product_13448_red-star-cube-storage"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399710"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540205_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540205_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1320, "fractionDigits": 2},
          "id": "f35df3cf-d898-49ea-af89-227d2f0fc503"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1200, "fractionDigits": 2},
          "id": "cde016b7-ba83-438a-b46d-70716026f951",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1320, "fractionDigits": 2},
          "id": "f35df3cf-d898-49ea-af89-227d2f0fc503"
        }],
        "key": "17007-212398422176",
        "sku": "17007-212398422176",
        "id": 1,
        "_id": "29cf6733-17ff-468d-a8ac-291a7d0bd947",
        "_name": "Set of 2 Glasses",
        "_slug": "product_17007_set-of-2-glasses"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1400138"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539714_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539714_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 550, "fractionDigits": 2},
          "id": "fe65c2ea-f11a-48fd-9a16-bae5412383c3"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 500, "fractionDigits": 2},
          "id": "fd2b7bd7-c015-42c0-813e-133ff5c07da0",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 550, "fractionDigits": 2},
          "id": "fe65c2ea-f11a-48fd-9a16-bae5412383c3"
        }],
        "key": "16872-212398421977",
        "sku": "16872-212398421977",
        "id": 1,
        "_id": "6d634b3c-ff40-4e11-83c2-63ad2768031d",
        "_name": "Sweet Rose Reed Diffuser - 70ml",
        "_slug": "product_16872_sweet-rose-reed-diffuser-70ml"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1400140"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539752_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539752_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 330, "fractionDigits": 2},
          "id": "8f19d85a-1344-4492-a17b-45c9c258154f"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 300, "fractionDigits": 2},
          "id": "464a33fe-8b56-4063-a657-1a3c7e513543",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 330, "fractionDigits": 2},
          "id": "8f19d85a-1344-4492-a17b-45c9c258154f"
        }],
        "key": "16875-212398421980",
        "sku": "16875-212398421980",
        "id": 1,
        "_id": "bf2e9b6b-bb88-4ddd-9428-4d2fcd86c82d",
        "_name": "Sweet Rose Fragrance Oil - 10ml",
        "_slug": "product_16875_sweet-rose-fragrance-oil-10ml"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399702"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539733_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539733_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "93504e00-4d74-43a1-953e-f3dc91a08a2a"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 700, "fractionDigits": 2},
          "id": "de72b2da-4c37-4c9d-b627-e4ddc1e60759",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "93504e00-4d74-43a1-953e-f3dc91a08a2a"
        }],
        "key": "16874-212398421979",
        "sku": "16874-212398421979",
        "id": 1,
        "_id": "15da3ba8-4368-4aa0-b814-fe1f051bb5cb",
        "_name": "Buddha Shadow Lamp",
        "_slug": "product_16874_buddha-shadow-lamp"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1404763"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540211_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540211_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 550, "fractionDigits": 2},
          "id": "6e3ba773-c14d-4ac4-b2bb-e0296cb61b2c"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 500, "fractionDigits": 2},
          "id": "14015a30-e4d2-4f17-afba-666a0a569a50",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 550, "fractionDigits": 2},
          "id": "6e3ba773-c14d-4ac4-b2bb-e0296cb61b2c"
        }],
        "key": "16878-212398421983",
        "sku": "16878-212398421983",
        "id": 1,
        "_id": "4f046a58-57f3-433a-85cb-80d9a107b68e",
        "_name": "Collapsible Storage Bag",
        "_slug": "product_16878_collapsible-storage-bag"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1405906"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5545835_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5545835_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "de87c1e8-ec68-4987-9e3e-1222fcfba214"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 800, "fractionDigits": 2},
          "id": "41c6130d-1dd2-455d-9dce-d8cbca506882",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "de87c1e8-ec68-4987-9e3e-1222fcfba214"
        }],
        "key": "16879-212398421984",
        "sku": "16879-212398421984",
        "id": 1,
        "_id": "3cef3a44-3e85-410f-98f1-88e331ebc8e0",
        "_name": "Elephant Desktop Planter",
        "_slug": "product_16879_elephant-desktop-planter"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399698"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539377_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539377_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1320, "fractionDigits": 2},
          "id": "9740d4ca-fd37-4f13-86c9-594a30f4de80"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1200, "fractionDigits": 2},
          "id": "0cccd527-a085-4fe3-bd30-7fe370f0f80f",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1320, "fractionDigits": 2},
          "id": "9740d4ca-fd37-4f13-86c9-594a30f4de80"
        }],
        "key": "16869-212398421974",
        "sku": "16869-212398421974",
        "id": 1,
        "_id": "b3a0968e-a82e-4b15-8f7e-37541920fb21",
        "_name": "Breathing Sleep Light",
        "_slug": "product_16869_breathing-sleep-light"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399705"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539913_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539913_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 440, "fractionDigits": 2},
          "id": "f5d29495-eb09-4fd8-bb49-e48a89b34428"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 400, "fractionDigits": 2},
          "id": "10ac9a83-3d8b-46de-be24-8b38349e5e91",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 440, "fractionDigits": 2},
          "id": "f5d29495-eb09-4fd8-bb49-e48a89b34428"
        }],
        "key": "16645-212398421141",
        "sku": "16645-212398421141",
        "id": 1,
        "_id": "cd2c98ed-4aa9-433f-be1c-4a378fcc81de",
        "_name": "Reusable Sandwich Wrap",
        "_slug": "product_16645_reusable-sandwich-wrap"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399706"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540023_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540023_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "9a6fdbef-2f67-420d-a18f-4fd319004614"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 600, "fractionDigits": 2},
          "id": "deb67872-2e39-4755-8e6a-46ce884c645d",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "9a6fdbef-2f67-420d-a18f-4fd319004614"
        }],
        "key": "16646-212398421142",
        "sku": "16646-212398421142",
        "id": 1,
        "_id": "6b330098-f712-467d-b31e-f18ad5df316b",
        "_name": "3-Piece Bamboo Cutlery Set",
        "_slug": "product_16646_3-piece-bamboo-cutlery-set"
      }, {
        "isMatchingVariant": true,
        "attributes": [{
          "name": "variantType",
          "value": {"key": "Version", "label": "Version"}
        }, {"name": "variantValue", "value": "Black"}, {
          "name": "startDate",
          "value": "2020-05-01T00:00:00.000Z"
        }, {"name": "endDate", "value": "2021-04-30T00:00:00.000Z"}, {"name": "finishedStockCode", "value": "1406060"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5545841_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5545841_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 4950, "fractionDigits": 2},
          "id": "deeab528-c4ba-474e-a276-e380e3890b75"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 4500, "fractionDigits": 2},
          "id": "0704651b-cb40-4255-903e-35fd7c354a6c",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 4950, "fractionDigits": 2},
          "id": "deeab528-c4ba-474e-a276-e380e3890b75"
        }],
        "key": "16651-212398421148",
        "sku": "16651-212398421148",
        "id": 1,
        "_id": "50ac08bb-b66d-4b67-b681-272b1a2543a4",
        "_name": "Skye Smart Watch",
        "_slug": "product_16651_skye-smart-watch"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399707"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540031_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5540031_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "b50b5f16-69d6-47b7-b780-bd5ee05c8f6d"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 700, "fractionDigits": 2},
          "id": "08086153-5c20-4b1e-9a6e-2de5d84072fd",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "b50b5f16-69d6-47b7-b780-bd5ee05c8f6d"
        }],
        "key": "16647-212398421143",
        "sku": "16647-212398421143",
        "id": 1,
        "_id": "dadbf3a5-9a34-4091-896a-f935bd60a9b1",
        "_name": "Weekly Planner",
        "_slug": "product_16647_weekly-planner"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399704"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539877_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539877_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1100, "fractionDigits": 2},
          "id": "711c7727-7757-4e79-b447-03a36d98495c"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1000, "fractionDigits": 2},
          "id": "46fad4a8-4841-4c78-a43f-e969882a5101",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 1100, "fractionDigits": 2},
          "id": "711c7727-7757-4e79-b447-03a36d98495c"
        }],
        "key": "16644-212398421140",
        "sku": "16644-212398421140",
        "id": 1,
        "_id": "6947fea2-14f5-4e74-9551-71c6366e6b8f",
        "_name": "Lunch Bag",
        "_slug": "product_16644_lunch-bag"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1403561"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539632_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539632_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "21475c79-6c07-4f52-a7a8-7e6741edef4d"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 600, "fractionDigits": 2},
          "id": "94bb70f7-cf7b-4f37-8093-3abb7fb6f081",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 660, "fractionDigits": 2},
          "id": "21475c79-6c07-4f52-a7a8-7e6741edef4d"
        }],
        "key": "16643-212398421139",
        "sku": "16643-212398421139",
        "id": 1,
        "_id": "9ede6d57-c470-43f4-93e0-c7dfd7c743a4",
        "_name": "Hamsa Incense Stick Holder",
        "_slug": "product_16643_hamsa-incense-stick-holder"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1399701"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539597_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539597_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "f9249a88-fc15-4536-8333-40342123e9ca"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 800, "fractionDigits": 2},
          "id": "565e2364-fe57-4687-a782-2e5be2d50e57",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 880, "fractionDigits": 2},
          "id": "f9249a88-fc15-4536-8333-40342123e9ca"
        }],
        "key": "16641-212398421137",
        "sku": "16641-212398421137",
        "id": 1,
        "_id": "16327b6a-7f95-4396-bcf7-adc5493668ec",
        "_name": "Hamsa Hanging Decoration",
        "_slug": "product_16641_hamsa-hanging-decoration"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1401234"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5521023_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5521023_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "8c9d997a-ae79-445a-9a81-017e62d030e3"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 700, "fractionDigits": 2},
          "id": "b75d0deb-3dc0-4a33-8251-092a5deaafb9",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 770, "fractionDigits": 2},
          "id": "8c9d997a-ae79-445a-9a81-017e62d030e3"
        }],
        "key": "16627-212398421088",
        "sku": "16627-212398421088",
        "id": 1,
        "_id": "6c365a22-1e13-470d-80de-89b2ab9504d9",
        "_name": "Southern Rose Candle - 300g",
        "_slug": "product_16627_southern-rose-candle-300g"
      }, {
        "isMatchingVariant": true,
        "attributes": [{"name": "startDate", "value": "2020-05-01T00:00:00.000Z"}, {
          "name": "endDate",
          "value": "2021-04-30T00:00:00.000Z"
        }, {"name": "finishedStockCode", "value": "1400839"}],
        "assets": [],
        "images": [{
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539680_1_613x613.jpg",
          "label": "Gallery",
          "dimensions": {"w": 613, "h": 613}
        }, {
          "url": "https://www.shopwithmyrep.co.uk/assets/en-gb/images/product/prod_5539680_1_185x185.jpg",
          "label": "Thumbnail",
          "dimensions": {"w": 185, "h": 185}
        }],
        "price": {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 192, "fractionDigits": 2},
          "id": "1ff3a50e-890e-43c5-9b15-003377517007"
        },
        "prices": [{
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 175, "fractionDigits": 2},
          "id": "8117e93b-8a7e-4a63-8049-73ecdab6347d",
          "channel": {"typeId": "channel", "id": "8e0ac013-be7a-4fb9-8f0d-b98483740a33"}
        }, {
          "value": {"type": "centPrecision", "currencyCode": "GBP", "centAmount": 192, "fractionDigits": 2},
          "id": "1ff3a50e-890e-43c5-9b15-003377517007"
        }],
        "key": "16481-212398420869",
        "sku": "16481-212398420869",
        "id": 1,
        "_id": "cd0c7955-e08f-46c2-bb5f-822cce8c1d4f",
        "_name": "Fresh Cotton Scented Sachet",
        "_slug": "product_16481_fresh-cotton-scented-sachet"
      }])

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      totals,
      totalItems,
      cartGetters,
      promoCode,
      productGetters,
      coupons,
      error,
      remCoupon,
      updateQuantity,
      getVariant,
      th,
      cartDiscounts,
      getSubtotal
    };
  },
};
</script>
<style scoped lang="scss">
  $mobile-max: 767px;
  $tablet-min: 768px;
  $tablet-max: 1023px;
  $desktop-min: 1024px;
  $desktop-l-min: 1200px;
  $desktop-xl-min: 1440px;
  $desktop-xxl-min: 1920px;
  // Media mixins
  @mixin for-mobile {
    @media (max-width: $desktop-min - 1px) {
      @content;
    }
  }
  @mixin for-desktop {
    @media (min-width: $desktop-min) {
      @content;
    }
  }
.editable-area {
  margin: 1em 0;
  display: block;
}
.cart_page {
  .cart_tableheading {
    tr {
      th {
        margin-right: 10px;
      }
    }
  }
  .my-cart {
    .cart_headers {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px solid;
      border-bottom-color: lightgrey;
      padding-bottom: 10px;
      .cart_header_price {
        margin-left: 100px;
      }
    }
  }
  .navTitle {
    margin: 10px;
    margin-bottom: 0px;
    padding: 18px;
    background: whitesmoke;
    width: 86%;
    .navIcon {
      float: right;
      margin-bottom: 10px;
      margin-top: -12px;
      margin-right: -15px;
    }
  }
}

.offer_cart {
  background: #f1f1f1;
  padding: 10px;
  margin-top: 10px;
  .offer_title {
    text-align: left;
    margin: 10px;
  }
  .offer_name {
    font-size: 12px;
    text-align: left;
    margin: 10px;
  }
}

.empty_cart {
  .empty_bag_title {
    height: 300px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #f1f1f1;
  }
  .empty_cart_heading {
    display: flex;
    @include for-mobile {
      display: block;
    }
    a {
      margin: 20px 15px 0px 15px;
      width: auto;
      @include for-desktop {
        width: 150px;
        margin: 20px 0px 0px 15px;
      }
    }
  }
  .empty_bag {
    text-align: center;
    margin-top: 5px;
  }
  .empty_cartlink {
    display: flex;
    justify-content: center;
  }
}

.cart_header {
  @include for-desktop {
    display: flex;
    align-items: baseline;
  }
  .cart_title {
    margin: 10px 0px;
  }
  .navLink_top {
    color: #707677;
    font-size: 12px;
  }
  .actions_top {
    display: flex;
    margin-left: auto;
    .cart_update_actions {
      width: 170px;
      margin: 20px 10px;
      background: white;
      border: 1px solid;
      color: var(--c-primary);
      border-radius: 5px;
      height: 40px;
    }
    .cart_checkout_actions {
      width: 190px;
      margin: 20px 10px;
      border-radius: 5px;
      height: 40px;
    }
  }
}

.cart_bottom {
  .cart_navlink {
    padding-left: 1em;
    width: 50%;
    font-weight: bold;
    color: var(--c-primary);
    font-family: var(--font-family);
    margin-top: 25px;
    text-align: left;
  }
  .cart_subtotal {
    .cart_subtotal-title {
      @include for-desktop {
        margin-right: 50px;
        margin-top: 15px;
      }
    }
    .productPrice {
      margin-top: 10px;
    }
    @include for-desktop {
      display: flex;
    }
    font-family: var(--font-family);
    font-size: 12px;
    float: right;
    margin-right: 20px;
    margin-top: -10px;
  }
}

.cart_actions {
  margin-top: 10px;
  @include for-desktop {
    display: flex;
    margin-top: 70px;
    margin-left: 10px;
  }
  .continue_link {
    float: left;
    margin-top: 30px;
    color: var(--c-primary);
    text-align: left;
  }
  .cart_update_actions {
    @include for-desktop {
      width: 170px;
    }
    margin: 20px 10px;
    width: 385px;
    background: white;
    border: 1px solid;
    color: var(--c-primary);
    border-radius: 5px;
    height: 40px;
  }
  .cart_checkout_actions {
    @include for-desktop {
      width: 190px;
    }
    margin: 20px 10px;
    width: 385px;
    border-radius: 5px;
    height: 40px;
  }
}
.cart_payment_options {
  @include for-mobile {
    border-bottom: 1px solid gray;
    padding-bottom: 50px;
  }
  @include for-desktop {
    display: flex;
  }
  .payment_title {
    font-family: var(--font-family);
  }
  .payment_options {
    display: flex;
    justify-content: center;
    @include for-desktop {
      margin-left: 10px;
    }
    div {
      margin-right: 10px;
    }
  }
}
.promo-code {
  display: flex;
  align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
  .voucher_input {
    width: 275px;
    height: 40px;
    margin: 0px 10px;
    text-align: left;
    .sf-input__wrapper {
      input {
        border-radius: 35px;
      }
    }
  }
}
.promo-code__button {
  background: white;
  color: var(--c-primary);
  border: 1px solid;
  border-color: var(--c-primary);
  border-radius: 5px;
  height: 35px;
  padding: 10px;
  margin-right: 5px;
  margin-top: 4px;
}

.promo-code__input {
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 10px;
  .sf-input__wrapper {
    input {
      width: 200px;
    }
  }
}

.error-block {
  background: #fff;
  text-align: center;
  padding: 10px;
  margin: 0;
  @include for-mobile {
    background: var(--c-transparent);
  }
}

.promo-code-remove__button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-right: 20px;
  width: 100%;
  border: 1px solid var(--c-white);
  text-align: center;
  button {
    margin-left: 10px;
    border-radius: 28px;
    padding: 3px 5px;
    font-size: 6px;
    background: var(--c-transparent);
    color: var(--c-primary);
    border: 1px solid var(--c-primary);
  }
  p {
    display: block;
    padding: 10px 0px;
  }
  .promo-code-text {
    color: var(--c-primary);
  }
}
</style>

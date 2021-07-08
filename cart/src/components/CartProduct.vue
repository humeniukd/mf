<template>
  <div>
    <div class="cart_products">
      <div class="cart_product_image">
        <router-link data-cy="cart_product_link" :to="link">
          <SfImage
            :src="image"
            alt="cart_product_image"
            :width="75"
            :height="75"
          />
        </router-link>
      </div>
      <div class="cart_product_title">
        <router-link data-cy="cart_product_link" :to="link">
          <SfHeading
            :level="4"
            :title="title"
            class="filters__title sf-heading--left"
          />
        </router-link>
      </div>
      <div class="cart_itemprice">
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="regularprice"
          :special="regularprice!==specialprice?specialprice:null"
        />
        <SfHeading :level="5" title="Inc. VAT" class="cart_vat" />
        <div class="exclusive_delivery_div">
          <SfHeading
            :level="6"
            title="Excludes delivery"
            class="cart_delivery_price"
          />
          <svg
            viewBox="0 0 20 20"
            width="15px"
            class="cart_exclusive-delivery_icon"
            id="Svg_info-current-invert"
          >
            <g
              fill="var(--c-primary)"
              fill-rule="evenodd"
              transform="translate(1 1)"
            >
              <circle
                cx="9"
                cy="9"
                r="9"
                stroke="var(--c-primary)"
                stroke-width="1.5"
              ></circle>
              <rect width="2" height="7" x="8" y="7" fill="#FFF" rx="1"></rect>
              <circle cx="9" cy="5" r="1" fill="#FFF"></circle>
            </g>
          </svg>
        </div>
      </div>
      <div class="cart_quantity" v-if="variant === ''">
        <SfInput
          type="number"
          name="Quantity"
          :value="qty"
          class="sf-quantity-selector__input qnty smartphone-only"
          @input="updateQuantity($event)"
          placeholder="0"
        />
        <SfQuantitySelector
          class="sf-quantity-selector--secondary desktop-only cart_quantity-selector"
          v-model="qty"
          aria-label="Quantity"
          @input="$emit('input', qty)"
        />
        <div class="cart_remove" @click="$emit('click:remove')">x remove</div>
      </div>

      <div v-else class="cart_quantity">
        <SfHeading :level="3" :title="qty.toString()" class="qnty_header" />
      </div>
      <div
        class="cart_subtotalprice smartphone-only"
      >
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="totalProductPrice"
          :special="totalProductPrice!==totalProductSpecialPrice?totalProductSpecialPrice:null"
        />
      </div>
      <div
        class="cart_subtotalprice desktop-only"
      >
        <SfPrice
          class="sf-product-card__price productPrice"
          :regular="totalProductPrice"
          :special="totalProductPrice!==totalProductSpecialPrice?totalProductSpecialPrice:null"
        />
      </div>
    </div>
    <div v-if="variant !== ''">
      <CartProductVariant
        :variant="variant"
        :qty="qty"
        :product="product"
        :link="link"
        @input="updateQuantity($event)"
        @click:remove="removeItem()"
      />
    </div>
    <hr />
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
import CartProductVariant from "./CartProductVariant.vue";
export default {
  name: "CartProduct",
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
    CartProductVariant,
  },
  props: [
    "title",
    "image",
    "regularprice",
    "specialprice",
    "qty",
    "link",
    "totalProductPrice",
    "totalProductSpecialPrice",
    "variant",
    "product",
  ],
  setup(props, context) {
    const updateQuantity = (quantity) => {
      context.emit("input", quantity);
    };
    const removeItem = () => {
      context.emit("click:remove");
    };
    return {
      updateQuantity,
      removeItem
    };
  },
};
</script>
<style lang="scss" scoped>
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
#Quantity {
  border-radius: 8px;
}

.cart_products {
  @include for-desktop {
    display: flex;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
  }
  @include for-mobile {
    display: grid;
    margin: 2em 20px;
  }
  .cart_product_image {
    @include for-mobile {
      grid-column: 1;
      grid-row: 1;
    }
  }
  .cart_product_title {
    @include for-mobile {
      grid-column: 2 / span 2;
      grid-row: 1;
    }
    @include for-desktop {
      min-width: 240px;
      max-width: 240px;
    }
  }
  .cart_itemprice {
    @include for-mobile {
      grid-column: 1;
      grid-row: 2;
      margin-top: 30px;
    }
    @include for-desktop {
      margin-top: 10px;
      min-width: 145px;
      max-width: 145px;
    }
    .cart_vat {
      text-align: left;
      margin-bottom: -15px;
    }
    .exclusive_delivery_div {
      display: flex;
      .cart_delivery_price {
        @include for-mobile {
          text-align: left;
          margin-top: 10px;
          width: 145px;
        }
        @include for-desktop {
          margin-top: 10px;
          text-align: left;
        }
      }
      .cart_exclusive-delivery_icon {
        margin-left: 5px;
        @include for-desktop {
          margin-top: 10px;
        }
        @include for-mobile {
          margin-bottom: 5px;
        }
      }
    }
  }
  .cart_quantity {
    @include for-mobile {
      grid-column: 2;
      grid-row: 2;
    }
    @include for-desktop {
      min-width: 175px;
      max-width: 175px;
    }
    .cart_quantity-selector {
      @include for-desktop {
        margin-top: 20px;
      }
    }
    .qnty {
      width: 75px;
      height: 50px;
      margin-top: 20px;
      text-align: center;
      border: 1px solid black;
      border-radius: 5px;
    }
    .qnty_header {
      width: 75px;
      height: 50px;
      margin-top: 45px;
      text-align: center;
      font-weight: bold !important;
      font-family: "Lato", Arial, Gotham, "Helvetica Neue", Helvetica,
        sans-serif !important;
      font-size: 16px !important;
      @include for-desktop {
        margin-left: 50px;
         margin-top: 30px;
      }
    }
    .remove_icon {
      float: left;
      margin-top: 5px;
      margin-right: 5px;
    }
    .cart_remove {
      font-family: var(--font-family);
      font-weight: bolder;
      font-size: 15px;
      cursor: pointer;
      width: 100px;
      padding-top: 10px;
      @include for-desktop {
        margin-left: 50px;
      }
    }
  }
  .cart_subtotalprice {
    @include for-mobile {
      grid-column: 3;
      grid-row: 2;
      margin-top: 30px;
    }
    @include for-desktop {
      margin-left: 20px;
      margin-top:10px;
    }
  }
}
</style>

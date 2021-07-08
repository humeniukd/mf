<template>
  <div class="cart_variant">
    <SfHeading
      :level="4"
      :title="
        variant.key === 'Shade'
          ? 'CHOSEN SHADES'
          : variant.key === 'Size'
          ? 'CHOSEN SIZES'
          : 'CHOSEN OPTIONS'
      "
      class="filters__title sf-heading--left cart_variant_head"
    />
    <div class="cart_variant_container">
      <SfImage
        v-if="th.getImageURL(product, 'Variant') !== ''"
        :src="th.getImageURL(product, 'Variant')"
        alt="cart_product_image"
        :width="76"
        :height="40"
        class="cart_variant_image"
      />
      <nuxt-link :to="link">
        <SfHeading
          :level="4"
          :title="th.getVariant(product, 'variantValue').value"
          class="filters__title sf-heading--left cart_variant_title"
        />
      </nuxt-link>
      <div class="cart_quantity">
        <SfInput
          type="number"
          name="Quantity"
          :value="qty"
          class="sf-quantity-selector__input qnty_variant smartphone-only"
          @input="updateQuantity($event)"
          placeholder="0"
        />
        <SfQuantitySelector
          class="
            sf-quantity-selector--secondary
            desktop-only
            cart_quantity-selector
          "
          v-model="qty"
          aria-label="Quantity"
          @input="$emit('input', qty)"
        />
        <div class="cart_remove" @click="$emit('click:remove')">x remove</div>
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
import useUiHelpers from "../composables/useUiHelpers";
export default {
  name: "CartProductVariant",
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
    SfTopBar
  },
  props: ["qty", "variant", "product", "link"],
  setup(props, context) {
    const th = useUiHelpers();
    const updateQuantity = (qty) => {
      context.emit("input", qty);
    };
    return {
      th,
      updateQuantity,
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
.cart_variant {
  @include for-desktop {
    margin:auto;
    margin-top: 10px;
    width: 70%;
  }
  .cart_variant_head {
    border-top: 1px dotted lightgrey;
    border-bottom: 1px dotted lightgrey;
    margin: 0px 20px 0px 20px;
    padding-top: 5px;
  }
  .cart_variant_container {
    display: flex;
    margin: 0px 20px 0px 20px;
    @include for-mobile {
      justify-content: space-between;
    }
    .cart_variant_image {
      margin-top: 20px;
      margin-right: 20px;
    }
    .cart_variant_title {
      margin-top: 20px;
      margin-right: 20px;
    }
    .cart_quantity {
      @include for-desktop {
        margin-left: auto;
        margin-top: 15px;
      }
      .qnty_variant {
        width: 75px;
        height: 50px;
        border-radius: 5px;
        margin-top: 20px;
        text-align: center;
        border: 1px solid black;
        border-radius: 5px;
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
  }
}
</style>

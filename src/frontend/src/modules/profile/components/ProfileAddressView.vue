<template>
  <div>
    <div
      v-if="Addresses.length > 0"
      class="layout__address"
    >
      <ProfileAddressItem
        v-for="address in Addresses"
        :key="address.value"
        :address="address"
      />
    </div>
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="showAddressForm = !showAddressForm"
      >
        Добавить новый адрес
      </button>
    </div>
    <ProfileNewAddress
      :new-address="true"
      :show-address-form="showAddressForm"
      @submit="closeForm"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileNewAddress from "@/modules/profile/components/ProfileNewAddress";
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";
import validator from "@/common/mixins/validator";

export default {
  name: "ProfileAddressView",
  components: { ProfileNewAddress, ProfileAddressItem },
  mixins: [validator],
  data: () => ({
    showAddressForm: false,
  }),

  computed: {
    ...mapState("Profile", ["Addresses"]),
  },

  methods: {
    closeForm() {
      this.showAddressForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/button.scss";
</style>

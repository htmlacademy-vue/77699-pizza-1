<template>
  <div>
    <div class="layout__address" v-if="Addresses.length > 0">
      <ProfileAddressItem
        v-for="address in Addresses"
        v-bind:key="address.value"
        v-bind:address="address"
      />
    </div>
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        v-on:click="showAddressForm = !showAddressForm"
      >
        Добавить новый адрес
      </button>
    </div>
    <ProfileNewAddress
      v-bind:newAddress="true"
      v-bind:showAddressForm="showAddressForm"
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
};
</script>

<style lang="scss" scoped></style>

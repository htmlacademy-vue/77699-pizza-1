<template>
  <div>
    <div class="sheet address-form">
      <div class="address-form__header">
        <b data-test="addressName">{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" v-on:click="addressForm">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p data-test="address">
        {{ address.street }}, {{ address.building }}, {{ address.flat }}
      </p>
      <small data-test="addressComment">{{ address.comment }}</small>
    </div>
    <ProfileNewAddress
      v-bind:newAddress="false"
      v-bind:showAddressForm="showAddressForm"
      v-bind:street="address.street"
      v-bind:name="address.name"
      v-bind:building="address.building"
      v-bind:flat="address.flat"
      v-bind:comment="address.comment"
      v-bind:id="address.id"
      v-on:submit="closeForm"
    />
  </div>
</template>

<script>
import ProfileNewAddress from "@/modules/profile/components/ProfileNewAddress";

export default {
  name: "ProfileAddressItem",
  components: { ProfileNewAddress },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showAddressForm: false,
  }),
  methods: {
    addressForm() {
      this.showAddressForm = !this.showAddressForm;
      this.newAddress = false;
    },
    closeForm() {
      this.showAddressForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/address-form.scss";
@import "~@/assets/scss/blocks/icon.scss";
</style>

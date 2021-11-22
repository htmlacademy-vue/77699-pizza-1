<template>
  <div>
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            v-on:click="
              showAddressForm = !showAddressForm;
              newAddress = false;
            "
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.street }}, {{ address.building }}, {{ address.flat }}</p>
      <small>{{ address.comment }}</small>
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
};
</script>

<style lang="scss" scoped></style>

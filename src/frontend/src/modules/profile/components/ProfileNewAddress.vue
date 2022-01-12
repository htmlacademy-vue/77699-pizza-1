<template>
  <div class="layout__address" v-if="showAddressForm">
    <form
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="addAddress"
    >
      <div class="address-form__header">
        <b>Адрес</b>
      </div>
      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <AppInput
              v-model="addressName"
              data-test="addressName"
              ref="addressName"
              type="text"
              name="addr-name"
              class="input"
              placeholder="Введите название адреса"
              required="required"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model="addressStreet"
              data-test="addressStreet"
              ref="addressStreet"
              type="text"
              name="addr-street"
              class="input"
              placeholder="Введите название улицы"
              required="required"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model="addressBuilding"
              data-test="addressBuilding"
              ref="addressBuilding"
              type="text"
              name="addr-house"
              class="input"
              placeholder="Введите номер дома"
              required="required"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира*</span>
            <AppInput
              v-model="addressFlat"
              data-test="addressFlat"
              ref="addressFlat"
              type="text"
              name="addr-apartment"
              class="input"
              placeholder="Введите № квартиры"
              required="required"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <AppInput
              v-model="addressComment"
              data-test="addressComment"
              ref="addressComment"
              type="text"
              name="addr-comment"
              class="input"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>
      <div class="address-form__buttons">
        <button
          type="button"
          data-test="delBtn"
          class="button button--transparent"
          v-if="!newAddress"
          v-on:click="delAddress"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppInput from "@/common/components/AppInput";

export default {
  name: "ProfileNewAddress",
  components: { AppInput },
  props: {
    newAddress: {
      type: Boolean,
      required: true,
    },
    showAddressForm: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    street: {
      type: String,
      required: false,
      default: "",
    },
    building: {
      type: String,
      required: false,
      default: "",
    },
    flat: {
      type: String,
      required: false,
      default: "",
    },
    comment: {
      type: String,
      required: false,
      default: "",
    },
    id: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      addressName: this.name,
      addressStreet: this.street,
      addressBuilding: this.building,
      addressFlat: this.flat,
      addressComment: this.comment,
    };
  },
  methods: {
    ...mapActions("Profile", ["deleteAddress", "postAddress", "putAddress"]),
    async addAddress() {
      if (this.newAddress) {
        // Если поля валидны - отправляем запрос на сервер.
        await this.postAddress({
          name: this.addressName,
          userId: this.user.id,
          street: this.addressStreet,
          building: this.addressBuilding,
          flat: this.addressFlat,
          comment: this.addressComment,
        });
      } else {
        // Если поля валидны - отправляем запрос на сервер.
        await this.putAddress({
          id: this.id,
          name: this.addressName,
          userId: this.user.id,
          street: this.addressStreet,
          building: this.addressBuilding,
          flat: this.addressFlat,
          comment: this.addressComment,
        });
      }
      this.$emit("submit");
    },
    async delAddress() {
      await this.deleteAddress(this.id);
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/address-form.scss";
</style>

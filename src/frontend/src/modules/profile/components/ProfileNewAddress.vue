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
          class="button button--transparent"
          v-if="!newAddress"
          v-on:click="deleteAddress"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppInput from "@/common/components/AppInput";
//import CartPizzaItem from "@/modules/cart/components/CartPizzaItem";

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
    async addAddress() {
      if (this.newAddress) {
        // Если поля валидны - отправляем запрос на сервер.
        await this.$api.addresses.post({
          name: this.addressName,
          userId: this.user.id,
          street: this.addressStreet,
          building: this.addressBuilding,
          flat: this.addressFlat,
          comment: this.addressComment,
        });
      } else {
        // Если поля валидны - отправляем запрос на сервер.
        await this.$api.addresses.put({
          id: this.id,
          name: this.addressName,
          userId: this.user.id,
          street: this.addressStreet,
          building: this.addressBuilding,
          flat: this.addressFlat,
          comment: this.addressComment,
        });
      }
      await this.$router.go();
    },
    async deleteAddress() {
      await this.$api.addresses.delete(this.id);
      await this.$router.go();
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style lang="scss" scoped></style>

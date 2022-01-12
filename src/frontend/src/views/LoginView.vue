<template>
  <body>
    <div class="sign-form">
      <router-link :to="{ name: 'IndexHome' }" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form method="post" @submit.prevent="login">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <AppInput
              ref="email"
              v-model="email"
              data-test="email"
              type="email"
              name="email"
              class="input"
              placeholder="example@mail.ru"
              :autofocus="true"
              :error-text="validations.email.error"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <AppInput
              v-model="password"
              data-test="password"
              type="password"
              name="pass"
              class="input"
              placeholder="***********"
              :error-text="validations.password.error"
            />
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div>
  </body>
</template>

<script>
import validator from "@/common/mixins/validator";
import AppInput from "@/common/components/AppInput";
import isLoggedIn from "@/middlewares/isLoggedIn";

export default {
  name: "LoginView",
  middlewares: [isLoggedIn],
  layout: "Header",
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",
    // и добавляем объект validations. Поля cо списком правил валидации
    // и параметром error для присвоения текста ошибки в миксине.
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  components: { AppInput },
  // При изменении любого из полей очищаем ошибки валидации
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    async login() {
      // Если есть невалидное поле - не отправлять запрос на сервер.
      // Также в миксине мы присваиваем текст ошибки
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      // Если поля валидны - отправляем запрос на сервер.
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      // После успешной авторизации отправляем пользователя на главную страницу.
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/button.scss";
@import "~@/assets/scss/blocks/close.scss";
@import "~@/assets/scss/blocks/title.scss";
</style>

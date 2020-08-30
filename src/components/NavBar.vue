<template>
  <div>
    <Menu mode="horizontal" theme="light" :active-name="active_nav">
      <MenuItem class="left-menu-item" name="/" to="/">
        {{ $t('navbar.index') }}
      </MenuItem>
      <MenuItem class="left-menu-item" name="/problem" to="/problem">
        {{ $t('navbar.problem') }}
      </MenuItem>
      <MenuItem class="left-menu-item" name="/submission" to="/submission">
        {{ $t('navbar.submission') }}

      </MenuItem>
      <Submenu name="/help">
        <template slot="title">
          {{ $t('navbar.help') }}
        </template>
        <MenuItem class="left-menu-item" name="/help" to="/help">
          {{ $t('navbar.index') }}
        </MenuItem>
        <MenuItem class="left-menu-item" name="/compiler" to="/compiler">
          {{ $t('navbar.compiler') }}

        </MenuItem>
      </Submenu>
      <Dropdown @on-click="handleLanguageItemClick" class="left-menu-item">
        <span>
          {{ $t('navbar.language') }}
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem
              v-for="item in Object.keys(locales)"
              :key="item"
              :name="item">
            <country-flag :country='locales[item].countryFlag'/>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <template v-if="!isAuthenticated">
        <div class="right-menu-item">
          <Button type="default" class="right-menu-item-button" @click="handleRegisterClick">{{
              $t('navbar.register')
            }}
          </Button>
          <Button type="default" class="right-menu-item-button" @click="loginModal=true">{{
              $t('navbar.login')
            }}
          </Button>
        </div>
      </template>
      <template v-else>
        <div class="right-menu-item">
          <Submenu name="user">
            <template slot="title">
              <Avatar :src="emailHashURL">{{ profile.username }}</Avatar>
            </template>
            <MenuGroup :title="$t('navbar.system_setting')">
              <MenuItem name="/system/problem" to="/system/manage_problem">{{ $t('navbar.problem_manage') }}</MenuItem>
              <MenuItem name="/system/permission" to="/system/manage_permission">
                {{ $t('navbar.permission_manage') }}
              </MenuItem>
            </MenuGroup>
            <MenuGroup :title="$t('navbar.basic_setting')">
              <MenuItem name="/user" :to="userUrl">{{ $t('navbar.self_info') }}</MenuItem>
              <MenuItem name="/self" to="/self">{{ $t('navbar.self_setting') }}</MenuItem>
              <MenuItem name="logout" @click.native="clearProfile">{{ $t('navbar.logout') }}</MenuItem>
            </MenuGroup>
          </Submenu>
        </div>
      </template>

      <Modal v-model="loginModal" @on-visible-change="visibleChange">
        <div slot="header">
          登录
        </div>
        <Login @closeModal="loginModal=false"/>
        <div slot="footer" style="display: none"></div>
      </Modal>
    </Menu>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Login from "./user/Login";
import CountryFlag from 'vue-country-flag'
import {ACCEPT_LOCALES, STORAGE_LOCALE_KEY} from '@/utils/constant'
import storage from "@/utils/storage";

export default {
  name: "NavBar",
  components: {Login, CountryFlag},
  inject: ['reload'],
  data() {
    return {
      isLogin: false,
      loginModal: false,
      enabledRegister: true,
      modalChange: null,
      locales: ACCEPT_LOCALES
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions(['getProfile', 'clearProfile', 'randomCaptcha', 'getWebLang']),
    visibleChange(visible) {
      if (visible) {
        this.randomCaptcha()
      }
    },
    handleRegisterClick() {
      this.$router.push('/register')
    },
    handleLanguageItemClick(name) {
      this.$Message.info(this.locales[name].updateMessage)
      storage.set(STORAGE_LOCALE_KEY, name)
      this.$i18n.locale = this.locales[name].lang
      this.getWebLang()
      this.reload()
    }
  }, computed: {
    ...mapGetters(['isAuthenticated', 'userUrl', 'isAdminRole', 'profile', 'emailHashURL', 'captcha_url', 'active_nav']),
  }
}
</script>

<style scoped>
.right-menu-item {
  float: right;
  margin-right: 10px;
}

.right-menu-item-button {
  margin: 0 5px 0 5px;
}
</style>

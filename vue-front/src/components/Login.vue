<script setup>
import { reactive, ref,onMounted } from "vue";
import { useStore } from 'vuex'
const store = useStore()

const loginForm = ref(null);
const ruleForm = reactive({
  username: "",
  password: "",
})

let initData = ref([])

const getData = async () => {
  const req = fetch('http://localhost:4000/user/select', {
    method: 'get',
  })
  const stream = await req;
  const res = await stream.text();
  return res;
}

const initialData = async () => {
  let res = await getData()
  initData.value = JSON.parse(res)
}

onMounted(() => {
  initialData()
})

const jundgeUser = (username, password) => {
  let find = 0
  initData.value.forEach(i => {
    if (i.username === username && i.password === password) find = 1
  })
  return find ? false : true
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (jundgeUser(ruleForm.username, ruleForm.password)) {
    callback(new Error("账号或密码错误， 请重新输入"))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: "账户不能为空", trigger: "blur" },
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ],
}

const submitForm = async () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      store.commit('addName', ruleForm.username)
      window.localStorage.setItem("have_login", JSON.stringify(`${ruleForm.username}=${ruleForm.password}`));
      window.location.href = "/#content";
    }
  });
};

</script>

<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <!-- <img class="logo"/> -->
        <div class="title">二手平台交易网站</div>
        <div class="tips">登陆界面</div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%; margin-top: 30px" type="primary" @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 100vh;
}

.login-container {
  border-radius: 4px;
  width: 420px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 21px 41px 0 rgba(194, 198, 228, 0.2);
  margin-bottom: 100px;
}
.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head .title {
  font-size: 28px;
  color: rgba(2, 2, 19, 0.603);
  /* font-weight: bold; */
}
.head .tips {
  font-size: 22px;
  color: #999;
  margin-top: 20px;
}

.login-form {
  margin: 0 auto;
  width: 70%;
}
.login-form .el-form-item {
  margin-bottom: 10px;
}
.login-form.el-form--label-top :v-deep(.el-form-item__label) {
  padding: 0;
}
</style>
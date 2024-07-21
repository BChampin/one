<script setup>
// import { onMounted } from 'vue'
const route = useRoute()
// const runtimeConfig = useRuntimeConfig()

// When accessing /posts/1, route.params.id will be 1
console.log(route)

// async function exchangeCode(req) {
//   const { code } = req.body;

//   try {
//     const response = await axios.post(runtimeConfig.public.GITLAB_OAUTH_URL, {
//       client_id: runtimeConfig.public.GITLAB_CLIENT_ID,
//       client_secret: runtimeConfig.public.GITLAB_CLIENT_SECRET,
//       code: code,
//       grant_type: 'authorization_code',
//       redirect_uri: runtimeConfig.public.WEB_OAUTH_CALLBACK_URL,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error)
//     return { error: 'Error exchanging code for token' };
//   }
// },

// onMounted(() => {
//   console.log(route)
//   if ()
// })
</script>

<template>
  <div>
    Loading Gitlab
    <pre>
      {{ $route }}
      {{ route }}
    </pre>
  </div>
</template>

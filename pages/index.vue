<template>
  <ClientOnly>
    <!-- Using ClientOnly since otherwise it triggers so fetching, needing localStorage that is not available on server-side -->
    <div
      v-if="$git.isLogged"
      class="fit"
    >
      <div class="row pa-lg">
        <WeatherCard />
      </div>
      <div class="row pa-lg">
        <BookmarksCard />
      </div>
    </div>
    <LoginPage v-else />
  </ClientOnly>
</template>

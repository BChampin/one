<template>
  <ClientOnly>
    <!-- Using ClientOnly since otherwise it triggers so fetching, needing localStorage that is not available on server-side -->
    <div
      v-if="$git.isLogged"
      class="fit"
    >
      <div class="row">
        Now we're logged in
        <UButton
          size="lg"
          label="get raw repo DEV"
          icon="ph:github-logo"
          @click="$git.getRawRepo()"
        />
      </div>
      <div class="row pa-lg">
        <WeatherCard />
      </div>
      <div class="row pa-lg">
        <EnvironmentsCard />
      </div>
    </div>
    <LoginPage v-else />
  </ClientOnly>
</template>

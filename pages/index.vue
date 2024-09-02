<template>
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
      <EnvironmentsCard />
    </div>
  </div>
  <LoginPage v-else />
</template>

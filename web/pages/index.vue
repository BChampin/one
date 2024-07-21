<script setup lang="ts">
// import UserAuthForm from './components/UserAuthForm.vue'

</script>

<template>
  <!-- This is ok -->
  <div class="row full-width">
    <div class="col-6 gt-sm bg-dark text-light">
      <div class="pa-xl">
        <h1 class="text-h1">
          Project One
        </h1>
        <div class="my-xl">
          <blockquote class="text-italic">
            Your one and only dashboard ever needed
          </blockquote>
        </div>
      </div>
    </div>
    <div class="col-6 bg-light">
      <div class="pa-xl">
        <div class="text-center">
          <h2>
            Login with ...
          </h2>
          <div class="my-md">
            <UiLabel for="email2" content="Email" class="mr-md" />
            <UiInput
              id="email2"
              placeholder="your@email.com"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
            />
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="row">
    <div class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div class="absolute inset-0 bg-zinc-900" />
        <div class="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer class="text-sm">
              Sofia Davis
            </footer>
          </blockquote>
        </div>
      </div>
      <div class="lg:p-8">
        <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p class="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

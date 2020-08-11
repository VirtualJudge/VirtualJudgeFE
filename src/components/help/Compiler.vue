<template>
  <div class="main-view">
    <h2>编译器信息</h2>
    <pre>
      <code class="language-shell">$ gcc --version
gcc (Ubuntu 9.3.0-10ubuntu2) 9.3.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ g++ --version
g++ (Ubuntu 9.3.0-10ubuntu2) 9.3.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ java --version
openjdk 14.0.1 2020-04-14
OpenJDK Runtime Environment (build 14.0.1+7-Ubuntu-1ubuntu1)
OpenJDK 64-Bit Server VM (build 14.0.1+7-Ubuntu-1ubuntu1, mixed mode, sharing)

$ python3 -V
Python 3.8.2

$ go version
go version go1.13.8 linux/amd64</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/atom-one-light.css';

export default {
  name: "Help",
  mounted() {
    hljs.registerLanguage('shell', shell);
    hljs.initHighlightingOnLoad();
  }
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>

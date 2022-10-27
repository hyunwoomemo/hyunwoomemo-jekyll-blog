---
title: "HTML"
layout: archive
permalink: categories/html

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.html %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
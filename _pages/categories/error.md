---
title: "ERROR"
layout: archive
permalink: categories/error

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.error %}
{% for post in posts %}
{% include archive-single2.html type=page.entries_layout %}
{% endfor %}

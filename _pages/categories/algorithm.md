---
title: "Algorithm"
layout: archive
permalink: categories/algorithm

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.algorithm %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
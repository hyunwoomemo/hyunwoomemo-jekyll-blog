---
title: "REACT"
layout: collection
permalink: categories/react
collection: categories/react
entries_layout: grid

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.react %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
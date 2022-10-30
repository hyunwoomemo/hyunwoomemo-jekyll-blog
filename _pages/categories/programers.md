---
title: "programers"
layout: archive
permalink: categories/programers

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.programers %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
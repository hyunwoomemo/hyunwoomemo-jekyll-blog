---
title: "Programmers"
layout: archive
permalink: categories/Programmers

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.Programmers %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
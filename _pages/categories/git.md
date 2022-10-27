---
title: "GIT"
layout: archive
permalink: categories/git

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.git %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
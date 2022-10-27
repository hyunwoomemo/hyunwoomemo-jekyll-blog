---
title: "Inbox"
layout: archive
permalink: categories/inbox

author_profile: true
sidebar:
  nav: "docs"
sidebar_main: true
---

{% assign posts = site.categories.inbox %}
{% for post in posts %}
  {% include archive-single2.html type=page.entries_layout %}
{% endfor %}
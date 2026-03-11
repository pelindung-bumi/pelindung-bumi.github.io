---
title: 'First systems note: building a calmer infra reading room'
description: 'A simple opening note about learning Kubernetes step by step, starting from a basic manifest and the habit of documenting what we understand.'
pubDate: 2026-03-12
writerGithub: 'pelindung-bumi'
---

We started this blog with a simple idea: write down what we are learning while it is still fresh. A lot of technical writing feels too distant from the real learning process, even though most of us understand things little by little.

For us, Kubernetes is one of those topics that becomes easier when we keep returning to the basics. Before talking about controllers, autoscaling, or production clusters, it helps to stay comfortable with the shape of a small manifest and what each part is trying to say.

## Why start from the basics

When we learn infrastructure topics, the hard part is often not the syntax. The hard part is building a mental model. Small examples help because they show how pieces fit together without too much noise.

That is why this first post starts with a basic Kubernetes manifest. It is not meant to be complete. It is meant to be readable.

## A basic Kubernetes manifest

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-demo
  labels:
    app: nginx-demo
spec:
  containers:
    - name: nginx
      image: nginx:1.27
      ports:
        - containerPort: 80
```

## Reading the manifest step by step

`apiVersion` tells Kubernetes which API schema we are using. `kind` tells it what object we want to create. In this case, it is a `Pod`, which is one of the simplest resources to read when we are beginning.

Inside `metadata`, we give the object a name and labels. The name helps us identify the resource directly. Labels become more important as systems grow because they help group and select related resources.

Inside `spec`, we define the desired state. Here we are saying that the pod should run one container named `nginx`, using the `nginx:1.27` image, and expose port `80` inside the container.

### What this example does not cover yet

This example does not handle restarts in a production-friendly way, traffic exposure through a `Service`, or scaling through a `Deployment`. That is fine. A basic example becomes useful when it gives us one stable thing to understand before we move outward.

## Why we like writing like this

We are not trying to sound bigger than we are. We are a small organization with curiosity for technology, and this blog is where we share what we are learning. Sometimes that means starting with a simple manifest and a few clear paragraphs.

The goal is not to impress. The goal is to make the next topic easier to approach.

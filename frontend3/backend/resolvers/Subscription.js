const Subscription = {
  taskrenew: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("TASK");
    },
  },
};

export default Subscription;

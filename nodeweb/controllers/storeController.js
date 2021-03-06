const mongoose = require('mongoose');

const Store = mongoose.model('Store');

// everything you put in the exports variable is imported when the module required
exports.homePage = (req, res) => {
  // console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();

  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);

  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1- Query the database for a list of stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the id
  const store = await Store.findOne({ _id: req.params.id });

  // 2. Confirm they are the owner of teh store
  // @TODO

  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // set the location data to be a Point (it does not pass the
  // default model value becaus of the findAndUpdate fn)
  req.body.location.type = 'Point';
  // 1. Find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old One
    runValidators: true,
  }).exec();

  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}"> View Store </a>`);

  // 2. Redirect them to the store view and tell them it worked
  res.redirect(`/stores/${store._id}/edit`);
};

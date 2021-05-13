const listUsers = async (User: any) => {
  return await User.find({});
};

export { listUsers };

const listUsers = async ({ User, param = null }: { User: any; param?: any }) => {
	return await User.find(param);
};

export { listUsers };

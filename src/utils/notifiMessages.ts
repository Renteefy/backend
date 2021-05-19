function notifiMessages({ status, owner, renter, sender }: { status: String; owner: String; renter: String; sender: String }) {
	if (status === "Request Raised") {
		if (owner === sender) {
			return `${renter} wants to rent the item`;
		}
		if (renter === sender) {
			return `You have requested ${owner} to rent this item`;
		}
	}
	if (status === "Accepted") {
		if (owner === sender) {
			return `You are presently renting this item to ${renter}`;
		}
		if (renter === sender) {
			return `Your request has been accepted by ${owner}`;
		}
	}
	if (status === "Rejected") {
		if (owner === sender) {
			return `You have denied ${renter} request to rent this item`;
		}
		if (renter === sender) {
			return `Your request was denied by ${owner}`;
		}
	}
	if (status === "Returned") {
		if (owner === sender) {
			return `This item has been returned to you by ${renter}`;
		}
		if (renter === sender) {
			return `You have returned this item to ${owner}`;
		}
	}
	if (status === "ClaimReturn") {
		if (owner === sender) {
			return `We have notified ${renter} to return the rented item`;
		}
		if (renter === sender) {
			return `${owner} has requested you to return the rented item`;
		}
	}
	if (status === "Terminated") {
		if (owner === sender) {
			return `This session has been successfully ended by you`;
		}
		if (renter === sender) {
			return `This session has been ended by ${owner}`;
		}
	}
	if (status === "EndSession") {
		if (owner === sender) {
			return `${renter} has requested to end this session`;
		}
		if (renter === sender) {
			return `We have notified ${owner} to end this session`;
		}
	}
}

export { notifiMessages };

export function arrayEquals<T>(
	arr1: T[],
	arr2: T[],
	{ matchOrder = true }: { matchOrder?: boolean } = {}
): boolean {
	const sorted1 = matchOrder ? arr1 : [...arr1].sort();
	const sorted2 = matchOrder ? arr2 : [...arr2].sort();

	for (let i = 0; i < sorted1.length; i++) {
		if (!sorted2[i] || sorted2[i] !== sorted1[i]) {
			return false;
		}
	}

	return true;
}

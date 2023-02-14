export async function getJobs() {

	const payload = {
		"companySkills": true,
		"dismissedListingHashes": [],
		"fetchJobDesc": true,
		"jobTitle": "Business Analyst",
		"locations": [],
		"numJobs": 20,
		"previousListingHashes": []
	};

  const res = await fetch('https://www.zippia.com/api/jobs/ ', {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
	});

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();

}

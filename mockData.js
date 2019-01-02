const locations = [
  {
    status: 1,
    uuid: "23a2f012-196c-4408-aeef-6f14a0da58c7",
    name: "Michael's Farm",
    desc: "This location is newer than the first",
    type: 1,
    phone: "",
    email: "",
    address: "",
    lat: 42.28730098482599,
    lng: -71.38718922777156,
    userId: "10155551990623507",
    imageURLs: [
      "http://localhost:9090/images/b872e5c1e920769268b8569759eb75b1.jpg",
      "http://localhost:9090/images/fde0767e1014046ef230d9d591cb14e0.jpg"
    ]
  },
  {
    status: 1,
    uuid: "51e0da44-1e79-4bd6-8a0e-f54062674dea",
    name: "Sean's farm",
    desc: "My home farm where I live",
    type: 2,
    phone: "5086856467",
    email: "",
    address: "2 Pershing Ave",
    lat: 42.2793,
    lng: -71.4162,
    userId: "111516644512196765667",
    imageURLs: [
      "http://localhost:9090/images/e6ba03ec195ee2383716ae51d9ebd06d.jpg"
    ]
  }
];
const users = [
  {
    provider: "Google",
    id: "189273798123",
    displayName: "SampleUser",
    name: {familyName: "Sample", givenName: "User"},
    language: "Eng",
    email: "Joe@ccg.cs",
    photos: [""],
    lastLogin: new Date()
  }
];
module.exports = {locations,users};

export default function reformatHookFormData(data, kwTag, jobTag) {
  console.log('reformatHookData', data)
  const formatData = {};
  // 1. Records the data entered by the user
  if (kwTag.length > 0) {
    formatData.keywords = kwTag.join(';');
  }
  if (jobTag.length > 0) {
    formatData.job = jobTag.join(';');
  }
  if (data.sector_of_activity) {
    formatData.sector_of_activity = data.sector_of_activity.map((s) => ({
      id: Number(s.value),
    }));
  }
  if (data.language) {
    formatData.language = data.language.map((s) => ({
      id: Number(s.value),
    }));
  }
  if (data.availability) {
    formatData.availability = Number(data.availability.value);
  }
  if (data.years_of_experiment) {
    formatData.years_of_experiment = Number(data.years_of_experiment.value);
  }
  if (data.mobility) {
    formatData.mobility = data.mobility.value;
  }
  return formatData;
}
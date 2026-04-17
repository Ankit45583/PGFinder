export const pgService = {
  validatePGData: (data) => {
    const errors = {}
    if (!data.name || data.name.trim().length < 3) errors.name = 'PG name must be at least 3 characters'
    if (!data.location) errors.location = 'Location is required'
    if (!data.address) errors.address = 'Full address is required'
    if (!data.rent || data.rent < 1000) errors.rent = 'Rent must be at least ₹1000'
    if (!data.deposit || data.deposit < 0) errors.deposit = 'Deposit amount is required'
    if (!data.gender) errors.gender = 'Please select PG type (Boys/Girls/Both)'
    if (!data.description || data.description.length < 20) errors.description = 'Description must be at least 20 characters'
    if (!data.totalRooms || data.totalRooms < 1) errors.totalRooms = 'Total rooms must be at least 1'
    if (!data.facilities || data.facilities.length === 0) errors.facilities = 'Please select at least one facility'
    return errors
  }
}
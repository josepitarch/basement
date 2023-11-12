import { Activity, Gender, type Macros, type Questionnaire } from '../types/types'

const calculateTMB = (questionnaire: Questionnaire) => {
  const activity = Activity[questionnaire.activity]
  return questionnaire.gender === Gender.MALE
    ? 88.362 + 13.397 * questionnaire.weight + 4.799 * questionnaire.height - 5.677 * questionnaire.age * Number(activity)
    : 447.593 + 9.247 * questionnaire.weight + 3.098 * questionnaire.height - 4.33 * questionnaire.age * Number(activity)
}

const calculateCarbsQuantity = (macros: Omit<Macros, 'carbs'>) => {
  const { kcal, fats, proteins } = macros
  const kcalOfFats = fats * 9
  const kcalOfProteins = proteins * 4

  return (kcal - kcalOfFats - kcalOfProteins) / 4
}

const calculateDietMacros = ({ questionnaire, gramFats, gramProteins }: { questionnaire: Questionnaire, gramFats: number, gramProteins: number }) => {
  const kcal = calculateTMB(questionnaire)
  const fats = questionnaire.weight * gramFats
  const proteins = questionnaire.weight * gramProteins
  const carbs = calculateCarbsQuantity({ kcal, fats, proteins })

  return {
    kcal,
    fats,
    carbs,
    proteins
  }
}

export default calculateDietMacros

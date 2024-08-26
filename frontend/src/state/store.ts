import { create } from"zustand"




type Theme = "dark" | "light"

interface ThemeType {
    theme : Theme,
    setTheme : (value : Theme) => void
}

export const useStore = create<ThemeType>()((set) => ({
    theme : "light",
    setTheme : (value) => set(() => ({theme : value}))

}))
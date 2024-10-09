import { create } from"zustand"
import { persist } from "zustand/middleware" 




type Theme = "dark" | "light"

interface ThemeType {
    theme : Theme,
    setTheme : (value : Theme) => void
}

export const useStore = create<ThemeType>()(
    persist(
        (set) => ({
        theme : "light",
        setTheme : (value) => set(() => ({theme : value}))
    
    }), {
        name : "theme",
    })
)
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type GameStep =
  | "welcome"
  | "trip-announcement"
  | "guess-intro"
  | "clue"
  | "country-guess"
  | "club-guess"
  | "reveal"
  | "thank-you"

interface Country {
  name: string
  flag: string
  code: string
  city: string // Added city for reveal
}

interface Club {
  name: string
  logo: string
  country: string
  nickname: string // Added nickname for dynamic clue generation
}

const countries: Country[] = [
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", city: "London" },
  { name: "Spanien", flag: "🇪🇸", code: "ESP", city: "Madrid" },
  { name: "Tyskland", flag: "🇩🇪", code: "GER", city: "Munich" },
  { name: "Italien", flag: "🇮🇹", code: "ITA", city: "Milan" },
  { name: "Frankrig", flag: "🇫🇷", code: "FRA", city: "Paris" },
  { name: "Holland", flag: "🇳🇱", code: "NED", city: "Amsterdam" },
  { name: "Portugal", flag: "🇵🇹", code: "POR", city: "Lisbon" },
  { name: "Brasilien", flag: "🇧🇷", code: "BRA", city: "Rio de Janeiro" },
  { name: "Argentina", flag: "🇦🇷", code: "ARG", city: "Buenos Aires" },
  { name: "Japan", flag: "🇯🇵", code: "JPN", city: "Tokyo" },
  { name: "Mexico", flag: "🇲🇽", code: "MEX", city: "Mexico City" },
  { name: "USA", flag: "🇺🇸", code: "USA", city: "New York" },
]

const clubs: Club[] = [
  { name: "Manchester United", logo: "🔴", country: "England", nickname: "The Red Devils" },
  { name: "Liverpool", logo: "🔴", country: "England", nickname: "The Reds" },
  { name: "Arsenal", logo: "🔴", country: "England", nickname: "The Gunners" },
  { name: "Chelsea", logo: "🔵", country: "England", nickname: "The Blues" },
  { name: "Manchester City", logo: "🔵", country: "England", nickname: "The Citizens" },
  { name: "Real Madrid", logo: "⚪", country: "Spain", nickname: "Los Blancos" },
  { name: "Barcelona", logo: "🔵", country: "Spain", nickname: "Blaugrana" },
  { name: "Bayern Munich", logo: "🔴", country: "Germany", nickname: "Die Roten" },
  { name: "Juventus", logo: "⚫", country: "Italy", nickname: "La Vecchia Signora" },
  { name: "AC Milan", logo: "🔴", country: "Italy", nickname: "I Rossoneri" },
  { name: "PSG", logo: "🔵", country: "France", nickname: "Les Parisiens" },
  { name: "Ajax", logo: "🔴", country: "Netherlands", nickname: "De Godenzonen" },
]

export default function TripRevealGame() {
  const [currentStep, setCurrentStep] = useState<GameStep>("welcome")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedClub, setSelectedClub] = useState<string>("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(true)

  const getProgress = () => {
    const steps = [
      "welcome",
      "trip-announcement",
      "guess-intro",
      "clue",
      "country-guess",
      "club-guess",
      "reveal",
      "thank-you",
    ]
    return (steps.indexOf(currentStep) / (steps.length - 1)) * 100
  }

  const getDynamicClue = () => {
    if (!selectedClub) return "Fra Hammers til X"
    const club = clubs.find((c) => c.name === selectedClub)
    return club ? `Fra Hammers til ${club.nickname}` : "Fra Hammers til X"
  }

  const renderStyledClue = () => {
    if (!selectedClub) return <span>Fra Hammers til X</span>
    const club = clubs.find((c) => c.name === selectedClub)
    if (!club) return <span>Fra Hammers til X</span>

    return (
      <span>
        Fra Hammers til <span className="text-primary">{club.nickname}</span>
      </span>
    )
  }

  const getRevealCity = () => {
    if (!selectedCountry) return "Adventure"
    const country = countries.find((c) => c.name === selectedCountry)
    return country ? country.city : "Adventure"
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setShowContent(false)

    setTimeout(() => {
      switch (currentStep) {
        case "welcome":
          setCurrentStep("trip-announcement")
          break
        case "trip-announcement":
          setCurrentStep("guess-intro")
          break
        case "guess-intro":
          setCurrentStep("clue")
          break
        case "clue":
          setCurrentStep("country-guess")
          break
        case "country-guess":
          setCurrentStep("club-guess")
          break
        case "club-guess":
          setCurrentStep("reveal")
          break
        case "reveal":
          setCurrentStep("thank-you")
          break
      }

      setTimeout(() => {
        setShowContent(true)
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    const element = document.querySelector(`[data-country="${country}"]`)
    if (element) {
      element.classList.add("animate-pulse")
      setTimeout(() => element.classList.remove("animate-pulse"), 600)
    }
  }

  const handleClubSelect = (club: string) => {
    setSelectedClub(club)
    const element = document.querySelector(`[data-club="${club}"]`)
    if (element) {
      element.classList.add("animate-pulse")
      setTimeout(() => element.classList.remove("animate-pulse"), 600)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight animate-fade-in-up">
                Hej Simon
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Klar til 5 spor indtil 28. august?
            </p>
          </div>
        )

      case "trip-announcement":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight animate-fade-in-up">
                Du skal på rejse...
              </h1>
              <div className="w-32 h-1 bg-secondary mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Du vil modtage 5 spor indtil 28. august for at opdage din destination!
            </p>
          </div>
        )

      case "guess-intro":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight animate-fade-in-up">
                Men først skal du gætte!
              </h1>
              <div className="w-40 h-1 bg-accent mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Dette er dit første spor. Klar til at spille?
            </p>
          </div>
        )

      case "clue":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight animate-fade-in-up">
                {getDynamicClue()}
              </h1>
              <div className="w-28 h-1 bg-primary mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Kom med dit gæt.
            </p>
          </div>
        )

      case "country-guess":
        return (
          <div
            className={`space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up">Hvilket land?</h2>
              <p className="text-muted-foreground animate-fade-in-up animation-delay-200">Vælg dit gæt</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {countries.map((country, index) => (
                <Card
                  key={country.code}
                  data-country={country.name}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in-up ${
                    selectedCountry === country.name
                      ? "ring-2 ring-primary bg-primary/20 scale-105 shadow-lg"
                      : "hover:bg-muted hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleCountrySelect(country.name)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl transition-transform duration-200 hover:scale-125">{country.flag}</div>
                    <p className="text-sm font-medium text-card-foreground">{country.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "club-guess":
        return (
          <div
            className={`space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-up">Hvilken klub?</h2>
              <p className="text-muted-foreground animate-fade-in-up animation-delay-200">Vælg dit gæt</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {clubs.map((club, index) => (
                <Card
                  key={club.name}
                  data-club={club.name}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in-up ${
                    selectedClub === club.name
                      ? "ring-2 ring-primary bg-primary/20 scale-105 shadow-lg"
                      : "hover:bg-muted hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleClubSelect(club.name)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-2xl transition-transform duration-200 hover:scale-125">{club.logo}</div>
                    <p className="text-sm font-medium text-card-foreground">{club.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "reveal":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight animate-fade-in-up">
                {renderStyledClue()}
              </h1>
              <div className="w-32 h-1 bg-secondary mx-auto rounded-full animate-scale-in"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
              Dit første spor er klar!
            </p>
          </div>
        )

      case "thank-you":
        return (
          <div
            className={`text-center space-y-8 transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight animate-fade-in-up">Tak!</h1>
              <div className="w-28 h-1 bg-primary mx-auto rounded-full animate-scale-in"></div>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up animation-delay-300">
                Dit første spor er blevet indsendt!
              </p>

              <div className="bg-muted/50 rounded-lg p-6 animate-fade-in-up animation-delay-500">
                <h3 className="text-lg font-semibold text-foreground mb-4">Hvad sker der nu?</h3>
                <p className="text-muted-foreground mb-4">
                  Du vil modtage 4 flere spor indtil 28. august, som vil afsløre din 4-dages rejseplan:
                </p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Spor 2: Dag 1 Aktivitet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">Spor 3: Dag 2 Aktivitet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">Spor 4: Dag 3 Aktivitet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Spor 5: Dag 4 Aktivitet</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-700">
                Hold øje med dine beskeder for det næste spor! 🎉
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getButtonText = () => {
    switch (currentStep) {
      case "country-guess":
        return selectedCountry ? "Lås Land" : "Vælg et Land"
      case "club-guess":
        return selectedClub ? "Lås Klub" : "Vælg en Klub"
      case "reveal":
        return "Indsend"
      case "thank-you":
        return "Færdig"
      default:
        return "Næste"
    }
  }

  const isButtonDisabled = () => {
    return (currentStep === "country-guess" && !selectedCountry) || (currentStep === "club-guess" && !selectedClub)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="w-full p-4">
        <Progress value={getProgress()} className="w-full max-w-md mx-auto transition-all duration-700 ease-out" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">{renderStep()}</div>
      </div>

      {/* Navigation */}
      {currentStep !== "thank-you" && (
        <div className="p-6">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleNext}
              disabled={isButtonDisabled() || isTransitioning}
              className="w-full py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 disabled:opacity-50 hover:scale-105 hover:shadow-lg active:scale-95"
              size="lg"
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

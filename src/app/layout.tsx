import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PromoBanner from "@/components/layout/PromoBanner";
import Navbar from "@/components/layout/Navbar";
import DiscountBanner from "@/components/DiscountBanner";
import { ClerkProvider } from '@clerk/nextjs'
import { bgBG } from "@clerk/localizations";
import type { LocalizationResource } from "@clerk/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "При Бари - Домашни торти и сладкиши",
  description: "Домашно приготвени торти, бисквити и десерти с много любов. Доставка в София.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const localization = {
  ...bgBG,
  signUp: {
    ...bgBG.signUp,
    start: {
      ...bgBG.signUp?.start,
      title: "Създаване на профил",
      subtitle: "Станете част от нашето сладко семейство",
    },
    emailCode: {
      ...bgBG.signUp?.emailCode,
      title: "Проверете имейла си",
      subtitle: "Изпратихме код за потвърждение на {emailAddress}",
      formTitle: "Код за потвърждение",
      formSubtitle: "Въведете кода от вашия имейл",
      resendButton: "Не получихте код? Изпрати пак",
    },
  },
  signIn: {
    ...bgBG.signIn,
    start: {
      ...bgBG.signIn?.start,
      title: "Добре дошли в При Бари",
      subtitle: "Влезте в профила си, за да поръчате любимите си торти",
      actionText: "Нямате профил?",
      actionLink: "Регистрирайте се тук"
    },
    password: {
      ...bgBG.signIn?.password,
      title: "Въведете парола",
      subtitle: "Моля, въведете паролата за вашия профил",
      actionLink: "Забравена парола?",
    },
    forgotPassword: {
      ...bgBG.signIn?.forgotPassword,
      title: "Забравена парола?",
      subtitle: "Въведете имейл, за да ви изпратим код за нулиране",
      subtitle_email: "Ще изпратим код за потвърждение на посочения имейл",
      formTitle: "Изпрати код за нулиране",
      resendButton: "Изпрати нов код",
    },
    resetPassword: {
      ...bgBG.signIn?.resetPassword,
      title: "Нова парола",
      formButtonPrimary: "Запази нова парола",
      successMessage: "Паролата е обновена",
      requiredMessage: "Въведете код и нова парола",
    },
    emailCode: {
      ...bgBG.signIn?.emailCode,
      title: "Потвърдете самоличността си",
      subtitle: "Изпратихме код за достъп на {emailAddress}",
      formTitle: "Код за вход",
      resendButton: "Изпрати нов код",
    },
    alternativeMethods: {
      title: "Или използвайте друг метод за вход",
    },
    alternativeMethodsBlockButton__emailCode: "Изпрати код на {identifier}",
  },
  formFieldLabel__emailAddress: "Имейл адрес",
  formFieldLabel__password: "Парола",
  formFieldLabel__confirmPassword: "Потвърди парола",
  formFieldLabel__firstName: "Име",
  formFieldLabel__lastName: "Фамилия",
  formFieldLabel__username: "Потребителско име",
  formFieldInputPlaceholder__emailAddresses: "Въведете имейл адрес",
} as LocalizationResource;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
        localization={localization}
   
        appearance={{
          layout: {
            logoImageUrl: '/img/logo1.png', // Adds your shop logo to the modal
            showOptionalFields: false,
          },
          variables: {
            colorPrimary: '#500050', // Your brand purple
            colorTextOnPrimaryBackground: 'white',
            borderRadius: '8px',
            fontFamily: 'IdealistSans, sans-serif',
          },
          elements: {
            // You can also target specific CSS classes if needed
            formButtonPrimary: 'hover:brightness-110 transition-all',
            card: 'shadow-xl border border-[#500050]/10',
          }
        }}
        >
          <PromoBanner />
          <Navbar />
          <DiscountBanner />
          {children}
        </ClerkProvider>
        
      </body>
    </html>
  );
}

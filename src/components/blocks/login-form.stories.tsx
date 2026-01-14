import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginForm } from "./login-form";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A reusable login form block with support for:
- Email and password authentication
- Social login providers (Google, GitHub, Apple, Microsoft, Facebook)
- Forgot password link
- Sign up link
- Full internationalization support

All text is automatically translated based on the current locale.
        `,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    onSubmit: () => {
      console.log("Form submitted");
    },
    onProviderLogin: () => console.log("Provider login clicked"),
    onForgotPassword: () => {
      console.log("Forgot password clicked");
    },
    onSignUp: () => {
      console.log("Sign up clicked");
    },
  },
  argTypes: {
    providers: {
      control: "check",
      options: ["google", "github", "apple", "microsoft", "facebook"],
      description: "Social login providers to display",
    },
    showForgotPassword: {
      control: "boolean",
      description: "Show the forgot password link",
    },
    showSignUp: {
      control: "boolean",
      description: "Show the sign up link",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state for the submit button",
    },
    title: {
      control: "text",
      description: "Custom title (overrides translation)",
    },
    description: {
      control: "text",
      description: "Custom description (overrides translation)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: (args) => <LoginForm {...args} />,
};

export const WithSocialProviders: Story = {
  args: {
    providers: ["google", "github"],
  },
  render: (args) => <LoginForm {...args} />,
};

export const AllProviders: Story = {
  args: {
    providers: ["google", "github", "apple", "microsoft", "facebook"],
  },
  render: (args) => <LoginForm {...args} />,
};

export const WithoutForgotPassword: Story = {
  args: {
    showForgotPassword: false,
  },
  render: (args) => <LoginForm {...args} />,
};

export const WithoutSignUp: Story = {
  args: {
    showSignUp: false,
  },
  render: (args) => <LoginForm {...args} />,
};

export const MinimalForm: Story = {
  args: {
    showForgotPassword: false,
    showSignUp: false,
  },
  render: (args) => <LoginForm {...args} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
    providers: ["google"],
  },
  render: (args) => <LoginForm {...args} />,
};

export const CustomTitleAndDescription: Story = {
  args: {
    title: "Welcome Back!",
    description: "Sign in to continue to your dashboard",
    providers: ["google", "github"],
  },
  render: (args) => <LoginForm {...args} />,
};

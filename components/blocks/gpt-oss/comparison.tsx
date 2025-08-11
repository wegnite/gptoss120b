import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Minus } from "lucide-react";

export default function GPTOSSComparison() {
  const models = [
    {
      name: "GPT-OSS-120B",
      highlight: true,
      features: {
        parameters: "120B",
        context: "200K tokens",
        multimodal: true,
        coding: "Advanced",
        reasoning: "State-of-art",
        speed: "150 tokens/s",
        openSource: true,
        price: "Free",
        api: "Available",
        fineTuning: true,
      },
    },
    {
      name: "GPT-4",
      highlight: false,
      features: {
        parameters: "1.7T",
        context: "128K tokens",
        multimodal: true,
        coding: "Advanced",
        reasoning: "Advanced",
        speed: "40 tokens/s",
        openSource: false,
        price: "$30/1M tokens",
        api: "Available",
        fineTuning: false,
      },
    },
    {
      name: "Claude 3",
      highlight: false,
      features: {
        parameters: "Unknown",
        context: "200K tokens",
        multimodal: true,
        coding: "Good",
        reasoning: "Advanced",
        speed: "80 tokens/s",
        openSource: false,
        price: "$15/1M tokens",
        api: "Available",
        fineTuning: false,
      },
    },
    {
      name: "Llama 3",
      highlight: false,
      features: {
        parameters: "70B",
        context: "128K tokens",
        multimodal: false,
        coding: "Good",
        reasoning: "Good",
        speed: "100 tokens/s",
        openSource: true,
        price: "Free",
        api: "Self-host",
        fineTuning: true,
      },
    },
  ];

  const featureLabels = {
    parameters: "Model Size",
    context: "Context Window",
    multimodal: "Multimodal",
    coding: "Coding Ability",
    reasoning: "Reasoning",
    speed: "Inference Speed",
    openSource: "Open Source",
    price: "Pricing",
    api: "API Access",
    fineTuning: "Fine-tuning",
  };

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
      ) : (
        <X className="w-5 h-5 text-gray-400" />
      );
    }
    return value;
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How GPT-OSS-120B Compares
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how GPT-OSS-120B stacks up against other leading AI models in the market
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="inline-block min-w-full">
            <Card className="border-0 shadow-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-6 font-semibold text-gray-900 dark:text-white">
                      Features
                    </th>
                    {models.map((model) => (
                      <th key={model.name} className="text-center p-6">
                        <div className={model.highlight ? "relative" : ""}>
                          {model.highlight && (
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                              Best Choice
                            </Badge>
                          )}
                          <div className={`font-semibold ${model.highlight ? "text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-white"}`}>
                            {model.name}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(featureLabels).map(([key, label], index) => (
                    <tr key={key} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : "bg-white dark:bg-gray-900"}>
                      <td className="p-6 font-medium text-gray-700 dark:text-gray-300">
                        {label}
                      </td>
                      {models.map((model) => (
                        <td key={model.name} className="p-6 text-center">
                          <div className={model.highlight && key === "price" ? "font-bold text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            {renderFeatureValue(model.features[key as keyof typeof model.features])}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        {/* Mobile Comparison Cards */}
        <div className="lg:hidden space-y-6">
          {models.map((model) => (
            <Card key={model.name} className={`p-6 ${model.highlight ? "border-purple-600 dark:border-purple-400 shadow-xl" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${model.highlight ? "text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-white"}`}>
                  {model.name}
                </h3>
                {model.highlight && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                    Best Choice
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                {Object.entries(featureLabels).map(([key, label]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                    <span className={`text-sm font-medium ${model.highlight && key === "price" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}>
                      {renderFeatureValue(model.features[key as keyof typeof model.features])}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Why Choose GPT-OSS */}
        <div className="mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 p-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Why Choose GPT-OSS-120B?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">$0</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Completely Free</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No usage fees, no hidden costs. Open source and free forever.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Blazing Fast</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    150 tokens/second inference speed for real-time applications.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔓</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Full Control</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Self-host, fine-tune, and customize for your specific needs.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
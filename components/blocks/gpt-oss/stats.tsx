import { Brain, Zap, Users, Globe } from "lucide-react";

export default function GPTOSSStats() {
  const stats = [
    {
      icon: Brain,
      value: "120B",
      label: "Parameters",
      description: "Massive neural network for complex reasoning",
    },
    {
      icon: Zap,
      value: "10x",
      label: "Faster",
      description: "Than previous generation models",
    },
    {
      icon: Users,
      value: "1M+",
      label: "Developers",
      description: "Active community worldwide",
    },
    {
      icon: Globe,
      value: "95+",
      label: "Languages",
      description: "Multilingual support",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What is GPT-OSS-120B?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            GPT-OSS-120B is the latest version of the open-source large language model, 
            officially launched in <strong>2025</strong>, with a groundbreaking event at 8 p.m. Pacific Time 
            hosted on the official platform.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
            Named after the concept of "Open Source Singularity", <strong>GPT-OSS</strong> represents a 
            significant leap forward, skipping the previously expected GPT-OSS-100B release to accelerate 
            progress amid intense AI competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Powered by Open Source AI
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  GPT-OSS-120B combines cutting-edge research with community-driven development 
                  to deliver state-of-the-art AI capabilities that are accessible to everyone.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    Advanced transformer architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    Optimized for both cloud and edge deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    Continuous learning and improvement
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full flex items-center justify-center">
                  <Brain className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
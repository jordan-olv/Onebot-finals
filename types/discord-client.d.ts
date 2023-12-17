// discord-client.d.ts
import { Client, Collection } from "discord.js";

// Déclaration du module pour étendre les types de discord.js
declare module "discord.js" {
  // Étendre l'interface Client
  interface Client {
    commands: Collection<string, Command>;
    slashCommands: Collection<string, SlashCommand>;
    // ... autres propriétés personnalisées ...
  }

}
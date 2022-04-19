import PokeAPIService from '@pokemon/services/pokeApi.service';
import PokemonSyncronizer, { TPokemonSyncMessage } from '@pokemon/services/pokemonSyncronizer.service';
import { QueueService } from '@pokemon/services/queue.service';
import { createSpan, getParentSpan, runWithSpan } from '@pokemon/telemetry/tracing';
import ampqlib from 'amqplib';

const pokemonSyncronizationHandler = async (message: ampqlib.ConsumeMessage) => {
  const pokeApiService = PokeAPIService()
  const pokemonSyncronizer = PokemonSyncronizer(pokeApiService);
  const { id }: TPokemonSyncMessage = JSON.parse(message.content.toString());
  
  await pokemonSyncronizer.sync(id);
};

export default function setupWorker(queueService: QueueService<TPokemonSyncMessage>) {
  queueService.subscribe(pokemonSyncronizationHandler);
}

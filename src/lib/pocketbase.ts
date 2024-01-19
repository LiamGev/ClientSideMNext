import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://energiecoach2.sendlab.nl');
pb.autoCancellation(false);

import { Injectable } from '@angular/core';
import { pb } from 'src/lib/pocketbase';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // login
  async userLogin(userName: string, password: string) {
    return await pb.collection('Users').authWithPassword(userName, password);
  }

  // load households
  async loadHouseholds() {
    return await pb.collection('Household').getFullList({
      sort: '-created',
    });
  }

  // load all boiler calculations
  async loadCalculationsBoiler() {
    return await pb.collection('Boiler').getFullList({
      sort: '-created',
    });
  }

  // create boiler calculation
  async createBoilerRecord(data: any) {
    return await pb.collection('Boiler').create(data);
  }

  // create new household
  async createNewHousehold(data: any) {
    return await pb.collection('Household').create(data);
  }

  // get boiler by ID
  async getBoilerById(boilerId: string) {
    return await pb.collection('Boiler').getOne(boilerId);
  }

  // get household by ID
  async getHouseholdById(id: string) {
    return await pb.collection('Household').getOne(id);
  }

  // Get user by ID
  async getUserById(id: string) {
    return await pb.collection('users').getOne(id);
  }

  // Delete calculation by ID
  async deleteCalculation(id: string) {
    return await pb.collection('Boiler').delete(id);
  }

  async updateHousehold(id: string, data: any) {
    return await pb.collection('Household').update(id, data);
  }
}

import { RFRLogger } from "./Logger";

export class ClickupHelper {
    private apiKey: string;
    private workspaceId: string = "";
    private spaceId: string = "";
    private drivingCarListId: string = "";
    private logger: RFRLogger = new RFRLogger();

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getTasks() {
        this.logger.log("API Call Requested");
        return await this.getDrivingCarTasks();
    }

    public async getDrivingCarTasks() {
        if (this.drivingCarListId === "") {
            const lists = await this.getFolderlessLists();
            this.logger.log(`lists ${JSON.stringify(lists)}`);
            this.drivingCarListId = lists.lists[1].id;
            this.logger.log(`drivingCarTasksListId ${this.drivingCarListId} retrieved`);
        }

        const response = await fetch(
            `https://api.clickup.com/api/v2/list/${this.drivingCarListId}/task`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'pk_57143560_TQOB8ZNCNW2EFCPG3A32RSU2DUPHRLCY'
                }
            }
        );
        this.logger.log("getRollingChassisList(): " + response.status + " " + response.statusText);
        if (response.status !== 200) {
            const message = await response.json();
            this.logger.log("Error: " + message);
            return 'Error: Check the logs for more details.';
        }
        return response.json();
    }

    public async getFolderlessLists() {
        if (this.spaceId === "") {
            const spaces = await this.getSpaces();
            this.logger.log(`spaces ${JSON.stringify(spaces)}`);
            this.spaceId = spaces.spaces[1].id;
            this.logger.log(`spaceId ${this.spaceId} retrieved`);
        }

        const response = await fetch(`https://api.clickup.com/api/v2/space/${this.spaceId}/list`,
            {
                method: 'GET',
                headers: {
                    Authorization: this.apiKey
                }
            }
        );
        this.logger.log("getFolders(): " + response.status + " " + response.statusText);
        if (response.status !== 200) {
            const message = await response.json();
            this.logger.log("Error: " + message);
            return 'Error: Check the logs for more details.';
        }
        return response.json();
    }

    public async getSpaces() {
        if (this.workspaceId === "") {
            const workspaces = await this.getWorkspaces();
            this.logger.log(`workspaces ${JSON.stringify(workspaces)}`);
            this.workspaceId = workspaces.teams[1].id;
            this.logger.log(`workspaceId ${this.workspaceId} retrieved`);
        }
        
        const response = await fetch(`https://api.clickup.com/api/v2/team/${this.workspaceId}/space`,
            {
                method: 'GET',
                headers: {
                    Authorization: this.apiKey
                }
            }
        );
        this.logger.log("getSpaces(): " + response.status + " " + response.statusText);
        if (response.status !== 200) {
            const message = await response.json();
            this.logger.log("Error: " + message);
            return 'Error: Check the logs for more details.';
        }
        return response.json();
    }

    public async getWorkspaces() {
        const response = await fetch('https://api.clickup.com/api/v2/team',
            {
                method: 'GET',
                headers: {
                    Authorization: this.apiKey
                }
            }
        );
        this.logger.log("getWorkspaces(): " + response.status + " " + response.statusText);
        if (response.status !== 200) {
            const message = await response.json();
            this.logger.log("Error: " + message);
            return 'Error: Check the logs for more details.';
        }
        return response.json();
    }
}
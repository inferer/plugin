const randomUUID = function () {
    return Math.random().toString(36)
}

const RequestHandler = {
    init(eventChannel) {
        this.eventChannel = eventChannel;
        this.calls = {};
        this.bindListener();
        return this.handler.bind(this);
    },

    bindListener() {
        this.eventChannel.on('injectPuginReply', ({ success, data, uuid }) => {
            if (success)
                this.calls[uuid] && this.calls[uuid].resolve && this.calls[uuid].resolve(data);
            else this.calls[uuid] && this.calls[uuid].reject && this.calls[uuid].reject(data);

            delete this.calls[uuid];
        });
    },

    handler(action, data = {}) {
        const uuid = randomUUID();
        this.eventChannel.send('injectPlugin', {
            action,
            data,
            uuid
        });

        return new Promise((resolve, reject) => {
            this.calls[uuid] = {
                resolve,
                reject
            };
        });
    }
};

export default RequestHandler;
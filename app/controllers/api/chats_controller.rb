class Api::ChatsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :must_be_authorized
  before_action :set_chat_room, only: %i[show]
  # before_action :ensure_no_associated_chat, only: %i[create]

  def index
    @chats = @authenticated_user.chats
    render json: { 'chats' => [] } if @chats.nil?
    render :index
  end

  def show
    @chat = Chat.find(params[:id])
    render :show
  end

  def create
    recipient = User.find(params[:recipient_id])
    sender = User.find(params[:sender_id])
    @chat = find_or_create_chat_between(sender, recipient)

    if @chat
      render :show
    else
      render json: { errors: { chats: 'Unable to create chat' } }, status: :unprocessable_entity
    end
  end

  # def update
  #   if @chat.update(chat_params)
  #     render :show
  #   else
  #     render json: @chat.errors, status: :unprocessable_entity
  #   end
  # end

  # def destroy
  #   @chat.destroy
  #   head :no_content
  # end

  private

  def find_or_create_chat_between(user1, user2)
    chat = Chat.joins(:chat_subscriptions)
               .where(chat_subscriptions: { participant_id: [user1.id, user2.id] })
               .group(:id)
               .having('COUNT(chats.id) = 2')
               .includes(:messages)
               .first

    unless chat
      chat = Chat.create(name: "#{user1.display_name} & #{user2.display_name}")

      ChatSubscription.create(chat:, participant: user1)
      ChatSubscription.create(chat:, participant: user2)
    end

    chat
  end

  # def ensure_no_associated_chat
  #   recipient_id = params[:recipient_id]

  #   chat = Chat.joins(:chat_subscriptions)
  #              .where(chat_subscriptions: { participant_id: [@authenticated_user.id, recipient_id] })
  #              .group('chats.id')
  #              .having('COUNT(DISTINCT chat_subscriptions.participant_id) = 2')

  #   Rails.logger.debug "Checked for existing chat: #{chat.inspect}"

  #   unless chat.blank?
  #     Rails.logger.debug "Found existing chat: #{chat.inspect}"
  #     render json: { 'errors' => chat },
  #            status: 406 and return false
  #   end

  #   true
  # end

  def set_chat_room
    @chat = Chat.find(params[:id])
  end

  # def chat_params
  #   params.require(:chat).permit(:name)
  # end
end

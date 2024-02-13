require 'test_helper'

class Money
  attr_reader :amount, :currency

  def initialize(amount, currency)
    @amount = amount
    @currency = currency
  end

  def self.dollar(amount)
    Money.new(amount, 'USD')
  end

  def self.franc(amount)
    Money.new(amount, 'CHF')
  end

  def equals(other)
    # other.is_a?(self.class) && @amount == other.amount
    @currency == other.currency && @amount == other.amount
  end

  # built in ruby equality comparison operator ==
  def ==(other)
    equals(other)
  end

  def times(multiplier)
    Money.new(amount * multiplier, currency)
  end
end

# class Dollar < Money
#   attr_reader :currency

#   def initialize(amount, currency)
#     super(amount, currency)
#     # @currency = currency
#   end
# end

# class Franc < Money
#   attr_reader :currency

#   def initialize(amount, currency)
#     super(amount, currency)
#     # @currency = currency
#   end
# end

class TDD < ActionDispatch::IntegrationTest
  test 'testMultiplication' do
    # five = Dollar.new(5)
    five = Money.dollar(5)
    assert_equal(Money.dollar(10), five.times(2))
    assert_equal(Money.dollar(15), five.times(3))
  end

  test 'testEquality' do
    assert(Money.dollar(5).equals(Money.dollar(5)))
    assert_not(Money.dollar(5).equals(Money.dollar(6)))
    # assert(Money.franc(5).equals(Money.franc(5)))
    # assert_not(Money.franc(5).equals(Money.franc(6)))
    assert_not(Money.franc(5).equals(Money.dollar(5)))
  end

  test 'testFrancMultiplication' do
    five = Money.franc(5)
    assert_equal(Money.franc(10), five.times(2))
    assert_equal(Money.franc(15), five.times(3))
  end

  test 'testCurrency' do
    assert_equal('USD', Money.dollar(1).currency)
    assert_equal('CHF', Money.franc(1).currency)
  end

  # test 'testDifferentClassEquality' do
  #   assert(Money.new(10, 'CHF').equals(Franc.new(10, 'CHF')))
  #   assert(Money.new(10, 'USD').equals(Dollar.new(10, 'USD')))
  # end
end
